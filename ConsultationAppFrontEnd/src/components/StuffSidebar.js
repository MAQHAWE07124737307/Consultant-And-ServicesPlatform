import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ConsultantSidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: '250px' }}>
      <h4 className="mb-4">
        <i className="fas fa-user-tie me-2" />
        Consultant Panel
      </h4>

      <Nav className="flex-column gap-2 flex-grow-1">
        <Nav.Link as={Link} to="/UpcomingApts" className="text-white">
          <i className="fas fa-calendar-alt me-2" />
          My Schedule
        </Nav.Link>

        <Nav.Link as={Link} to="/appointmentrequests" className="text-white">
          <i className="fas fa-inbox me-2" />
          Appointment Requests
        </Nav.Link>

        <Nav.Link as={Link} to="/availability" className="text-white">
          <i className="fas fa-clock me-2" />
          Availability Manager
        </Nav.Link>

        <Nav.Link as={Link} to="/profile" className="text-white">
          <i className="fas fa-concierge-bell me-2" />
         Profile
        </Nav.Link>

        

        <Nav.Link as={Link} to="/client-reviews" className="text-white">
          <i className="fas fa-star me-2" />
          Client Reviews
        </Nav.Link>
      </Nav>

      <div className="mt-4">
        <Nav.Link as={Link} to="/logout" className="text-white">
          <i className="fas fa-sign-out-alt me-2" />
          Logout
        </Nav.Link>
      </div>
    </div>
  );
};

export default ConsultantSidebar;