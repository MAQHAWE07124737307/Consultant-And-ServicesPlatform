import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

const ServiceList = ({ onSelect }) => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to fetch services from the backend
  const fetchServices = async (query = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:7280/api/Services?name=${query}`);
      setServices(response.data); // API returns array of services
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    }
    setLoading(false);
  };

  // Fetch all services on initial render
  useEffect(() => {
    fetchServices();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchServices(search);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📚 Book a Service</h3>

      {/* Search bar */}
      <Form className="mb-4" onSubmit={handleSearchSubmit}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <p>Loading services...</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {services.length > 0 ? (
            services.map((service) => (
              <Col key={service.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{service.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Department: {service.departmentName}
                    </Card.Subtitle>
                    <Card.Text>{service.description}</Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> R{service.price}
                    </Card.Text>
                    <Button variant="primary" onClick={() => onSelect(service)}>
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No services found.</p>
          )}
        </Row>
      )}
    </div>
  );
};

export default ServiceList;