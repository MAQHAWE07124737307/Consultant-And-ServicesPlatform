// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { Card, Image, Form, Button } from 'react-bootstrap';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulated DB JSON (local user data)
    const userData = {
      fullName: "Machawe Dube",
      email: "machawe@example.com",
      phone: "+27 71 234 5678",
      role: "User",
      joinedDate: "2023-09-15"
    };

    setUser(userData);
  }, []);

  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    console.log("Updated user data:", user);
    // Placeholder for sending data to server or saving to storage
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <Card className="shadow-sm p-3">
        <div className="d-flex align-items-center mb-3">
          <Image
            src="https://randomuser.me/api/portraits/men/32.jpg"
            roundedCircle
            width="120"
            height="120"
            className="me-4"
          />
          <div>
            <h4>{user.fullName}</h4>
            <p className="text-muted">{user.role}</p>
          </div>
        </div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Joined Date</Form.Label>
            <Form.Control
              type="text"
              value={user.joinedDate}
              disabled
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={user.role}
              disabled
              readOnly
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePage;