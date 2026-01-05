import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import ServiceList from '../components/ServiceList';
import SelectConsultant from '../components/SelectedConsultant';
import SelectSlot from '../components/SelectSlot';

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded.sub || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
};

const BookingFlow = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [finalBooking, setFinalBooking] = useState(null);

  return (
    <div className="container mt-4">
      {!selectedService && (
        <ServiceList onSelect={setSelectedService} />
      )}

      {selectedService && !selectedConsultant && (
        <>
          <h4> Selected Service: {selectedService.name}</h4>
          <SelectConsultant
            service={selectedService}
            onSelect={setSelectedConsultant}
          />
        </>
      )}

      {selectedConsultant && !finalBooking && (
        <SelectSlot
          service={selectedService}
          consultant={selectedConsultant}
          onConfirm={async (slot) => {
            try {
              const currentUserId = getUserIdFromToken();

              const payload = {
                userId: currentUserId,
                consultantId: selectedConsultant.userId,
                serviceId: selectedService.id,
                slotId: slot.id,
              };

              const token = localStorage.getItem("token");

              const response = await fetch("https://localhost:7280/api/Booking/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
              });

              if (!response.ok) throw new Error("Failed to save booking");

              const savedBooking = await response.json();

              const slotStart = new Date(slot.startTime);
              const slotEnd = new Date(slot.endTime);

              setFinalBooking({
                ...savedBooking,
                service: selectedService,
                consultant: selectedConsultant,
                date: slotStart.toLocaleDateString(),
                time: `${slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              });
            } catch (error) {
              console.error(error);
              alert("❌ Could not save booking. Please try again.");
            }
          }}
        />
      )}

      {finalBooking && (
        <div className="mt-4">
          <h4>Booking Confirmed!</h4>
          <p><strong>Service:</strong> {finalBooking.service.name}</p>
          <p><strong>Consultant:</strong> {finalBooking.consultant.fullName}</p>
          <p><strong>Specialization:</strong> {finalBooking.consultant.specialization}</p>
          <p><strong>Date:</strong> {finalBooking.date}</p>
          <p><strong>Time:</strong> {finalBooking.time}</p>
          <p className="text-success fw-bold">Booking saved to the database!</p>
        </div>
      )}
    </div>
  );
};

export default BookingFlow;