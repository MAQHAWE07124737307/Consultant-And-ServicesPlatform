import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import ServiceList from "../components/ServiceList";
import SelectConsultant from "../components/SelectedConsultant";
import SelectSlot from "../components/SelectSlot";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  return (
    decoded.sub ||
    decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
  );
};

const BookingFlow = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [pendingSlot, setPendingSlot] = useState(null);
  const [finalBooking, setFinalBooking] = useState(null);

  // STEP 1: Select Service
  if (!selectedService) {
    return (
      <div className="container mt-4">
        <ServiceList onSelect={setSelectedService} />
      </div>
    );
  }

  // STEP 2: Select Consultant
  if (!selectedConsultant) {
    return (
      <div className="container mt-4">
        <h4>Selected Service: {selectedService.name}</h4>
        <SelectConsultant
          service={selectedService}
          onSelect={setSelectedConsultant}
        />
      </div>
    );
  }

  // STEP 3: Select Slot
  if (!pendingSlot && !finalBooking) {
    return (
      <div className="container mt-4">
        <h4>Select a Time Slot</h4>
        <SelectSlot
          service={selectedService}
          consultant={selectedConsultant}
          onConfirm={(slot) => setPendingSlot(slot)}
        />
      </div>
    );
  }

  // STEP 4: Confirm Booking
  if (pendingSlot && !finalBooking) {
    const start = new Date(pendingSlot.startTime);
    const end = new Date(pendingSlot.endTime);

    return (
      <div className="container mt-4">
        <div className="card p-4">
          <h4 className="mb-3">Confirm Your Booking</h4>

          <p><strong>Service:</strong> {selectedService.name}</p>
          <p><strong>Consultant:</strong> {selectedConsultant.fullName}</p>
          <p><strong>Date:</strong> {start.toLocaleDateString()}</p>
          <p>
            <strong>Time:</strong>{" "}
            {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            {" – "}
            {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-secondary"
              onClick={() => setPendingSlot(null)}
            >
              Back
            </button>

            <button
              className="btn btn-success"
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  const userId = getUserIdFromToken();

                  const payload = {
                    userId,
                    consultantId: selectedConsultant.userId,
                    serviceId: selectedService.id,
                    slotId: pendingSlot.id,
                  };

                  const response = await fetch(
                    "https://localhost:7280/api/Booking/create",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(payload),
                    }
                  );

                  if (!response.ok) throw new Error("Booking failed");

                  const savedBooking = await response.json();

                  setFinalBooking({
                    ...savedBooking,
                    service: selectedService,
                    consultant: selectedConsultant,
                    date: start.toLocaleDateString(),
                    time: `${start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} – ${end.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`,
                  });

                  setPendingSlot(null);
                } catch (err) {
                  alert("❌ Could not complete booking");
                }
              }}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 5: Booking Confirmed
  return (
    <div className="container mt-4">
      <h4 className="text-success">Booking Confirmed! </h4>

      <p><strong>Service:</strong> {finalBooking.service.name}</p>
      <p><strong>Consultant:</strong> {finalBooking.consultant.fullName}</p>
      <p><strong>Date:</strong> {finalBooking.date}</p>
      <p><strong>Time:</strong> {finalBooking.time}</p>
    </div>
  );
};

export default BookingFlow;
