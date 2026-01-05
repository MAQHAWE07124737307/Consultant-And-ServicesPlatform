import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 d-flex flex-column p-3" style={{ width: '250px' }}>
      <h4 className="mb-4">
        <i className="fas fa-scissors me-2" />
        Admin Panel
      </h4>

      <Nav className="flex-column gap-2 flex-grow-1">
        <Nav.Link as={Link} to="/dashboard" className="text-white">
          <i className="fas fa-tachometer-alt me-2" />
          Dashboard
        </Nav.Link>

        <Nav.Link as={Link} to="/appointments" className="text-white">
          <i className="fas fa-calendar-check me-2" />
          Appointments
        </Nav.Link>

        <Nav.Link as={Link} to="/services" className="text-white">
          <i className="fas fa-cut me-2" />
          Services
        </Nav.Link>

        <Nav.Link as={Link} to="/staff" className="text-white">
          <i className="fas fa-user-friends me-2" />
          Staff
        </Nav.Link>

        <Nav.Link as={Link} to="/clients" className="text-white">
          <i className="fas fa-users me-2" />
          Clients
        </Nav.Link>

        <Nav.Link as={Link} to="/reports" className="text-white">
          <i className="fas fa-chart-line me-2" />
          Reports
        </Nav.Link>
      </Nav>

      <div>
        <Nav.Link as={Link} to="/logout" className="text-white">
          <i className="fas fa-sign-out-alt me-2" />
          Log Out
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;