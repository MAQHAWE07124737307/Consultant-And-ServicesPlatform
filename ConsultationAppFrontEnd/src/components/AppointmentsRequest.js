import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Badge, Spinner, Card, Button } from 'react-bootstrap';

const ConsultantAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get JWT token from localStorage
  const token = localStorage.getItem('token');

  const statusMap = {
    0: 'Pending',
    1: 'Confirmed',
    2: 'Cancelled'
  };

  const statusColor = (status) => {
    switch (status) {
      case 0: return 'warning';
      case 1: return 'success';
      case 2: return 'danger';
      default: return 'secondary';
    }
  };

  // Fetch appointments from API
  const fetchAppointments = () => {
    setLoading(true);
    axios.get('https://localhost:7280/api/Consultants/consultant-bookings', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setAppointments(res.data))
    .catch(err => console.error('Error fetching appointments:', err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (token) fetchAppointments();
  }, [token]);

  // Handle approve/reject
  const handleAction = (id, action) => {
    const url = `https://localhost:7280/api/Consultants/${action}/${id}`;
    axios.patch(url, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => fetchAppointments()) // refresh after action
    .catch(err => console.error(`Failed to ${action} booking:`, err));
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm">
        <h4 className="mb-3"> Your Appointments</h4>

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Service</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No appointments found
                </td>
              </tr>
            ) : appointments.map(appt => {
              const start = new Date(appt.slotStart);
              const end = new Date(appt.slotEnd);
              return (
                <tr key={appt.id}>
                  <td>{appt.id}</td>
                  <td>{appt.clientName}</td>
                  <td>{appt.serviceName}</td>
                  <td>{start.toLocaleDateString()}</td>
                  <td>{start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>
                    <Badge bg={statusColor(appt.status)}>
                      {statusMap[appt.status]}
                    </Badge>
                  </td>
                  <td>
                    {appt.status === 0 ? ( // Pending
                      <>
                        <Button
                          size="sm"
                          variant="outline-success"
                          className="me-2"
                          onClick={() => handleAction(appt.id, 'approve')}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleAction(appt.id, 'reject')}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span className="text-muted small">No action needed</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default ConsultantAppointments;
