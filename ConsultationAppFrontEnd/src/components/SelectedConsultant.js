import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import defaultAvatar from "../components/Assets/Avatar.jpg"; // fallback avatar

const SelectConsultant = ({ service, onSelect }) => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!service) return;

    const fetchConsultants = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7280/api/Consultants/by-service/${service.id}`
        );
        setConsultants(response.data);
      } catch (error) {
        console.error('Error fetching consultants:', error);
        setConsultants([]);
      }
      setLoading(false);
    };

    fetchConsultants();
  }, [service]);

  if (!service) return null;

  return (
    <div className="container mt-4">
      <h4 className="mb-4">
        👤 Select a Consultant for <strong>{service.name}</strong>
      </h4>

      {loading ? (
        <Spinner animation="border" />
      ) : consultants.length === 0 ? (
        <Alert variant="warning">
          No consultants found for {service.name}.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {consultants.map((consultant) => (
            <Col key={consultant.id}>
              <Card className="h-100 shadow-sm">
                {/* Avatar with fallback */}
                <Card.Img
                  variant="top"
                  src={consultant.photoUrl || defaultAvatar}
                  alt={consultant.fullName || "Consultant"}
                  style={{ height: '160px', objectFit: 'cover' }}
                />

                <Card.Body>
                  {/* Name */}
                  <Card.Title>{consultant.fullName || "Unnamed Consultant"}</Card.Title>

                  {/* Details */}
                  <Card.Text>
                    <strong>Specialization:</strong> {consultant.specialization}<br />
                    <strong>Qualification:</strong> {consultant.qualification}<br />
                    <strong>License #:</strong> {consultant.licenseNumber}<br />
                    <strong>Experience:</strong> {consultant.yearsOfExperience} years<br />
                    <strong>Rating:</strong>{" "}
                    <span style={{ color: "#f5c518" }}>
                      {"⭐".repeat(consultant.rating || 0)}
                      {"☆".repeat(5 - (consultant.rating || 0))}
                    </span>
                  </Card.Text>

                  {/* Action Button */}
                  <Button
                    variant="success"
                    onClick={() => onSelect(consultant)}
                  >
                    Choose Consultant
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default SelectConsultant;