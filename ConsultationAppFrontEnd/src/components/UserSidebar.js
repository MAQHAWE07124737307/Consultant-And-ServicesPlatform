import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserSidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 d-flex flex-column p-3" style={{ width: '250px' }}>
      <h4 className="mb-4">
        <i className="fas fa-user-circle me-2" />
        User Panel
      </h4>

      <Nav className="flex-column gap-2 flex-grow-1">
        <Nav.Link as={Link} to="/user-dashboard" className="text-white">
          <i className="fas fa-home me-2" />
          Dashboard
        </Nav.Link>

        <Nav.Link as={Link} to="/book-service" className="text-white">
          <i className="fas fa-concierge-bell me-2" />
          Book a Service
        </Nav.Link>

        <Nav.Link as={Link} to="/mybookings" className="text-white">
          <i className="fas fa-calendar-alt me-2" />
          My Bookings
        </Nav.Link>

        <Nav.Link as={Link} to="/profile" className="text-white">
          <i className="fas fa-user me-2" />
          Profile
        </Nav.Link>

        <Nav.Link as={Link} to="/support" className="text-white">
          <i className="fas fa-life-ring me-2" />
          Support
        </Nav.Link>
      </Nav>

      <div>
        <Nav.Link as={Link} to="/logout" className="text-white">
          <i className="fas fa-sign-out-alt me-2" />
          Logout
        </Nav.Link>
      </div>
    </div>
  );
};

export default UserSidebar;