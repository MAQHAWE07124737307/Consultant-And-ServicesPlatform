import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import AppointmentCalendar from '../components/AppointmentCalendar';

const UserDashboard = () => {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          "https://localhost:7280/api/Client/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setConsultations(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // 🧠 Stats
  const total = consultations.length;
  const upcoming = consultations.filter(c => new Date(c.slotStart) > new Date()).length;
  const completed = consultations.filter(c => c.status === 'Completed').length;
  const pending = consultations.filter(c => c.status === 'Pending').length;

  return (
    <div className="container-fluid">
      <h3 className="mb-4">Welcome back 👋</h3>

      <Row className="mb-4">
        <Col md={3}>
          <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>Total Bookings</Card.Title>
              <h2>{total}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card bg="success" text="white">
            <Card.Body>
              <Card.Title>Upcoming</Card.Title>
              <h2>{upcoming}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card bg="info" text="white">
            <Card.Body>
              <Card.Title>Completed</Card.Title>
              <h2>{completed}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card bg="warning" text="white">
            <Card.Body>
              <Card.Title>Pending</Card.Title>
              <h2>{pending}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Upcoming Schedule</Card.Title>
          <AppointmentCalendar bookings={consultations} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserDashboard;
