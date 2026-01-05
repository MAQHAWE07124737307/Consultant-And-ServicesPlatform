import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Badge, Spinner, Button, ButtonGroup, Card } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const AppointmentRequests = () => {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  // 👤 Extract consultant ID from token
  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;
  
  const storedUser = JSON.parse(localStorage.getItem('user'));
const consultantId = storedUser?.id;
console.log('Decoded Token:', decoded);
  useEffect(() => {
    if (!consultantId) return;

   axios.get('http://localhost:5062/api/AppointmentsControler/GetFormattedAppointments2', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
      .then(res => {
        const consultantOnly = res.data.filter(
          appt => appt.consultantId === consultantId
        );
        setAppointments(consultantOnly);
        setFiltered(consultantOnly);
      })
      .catch(err => console.error('Error fetching appointments:', err))
      .finally(() => setLoading(false));
  }, [consultantId]);

  const handleUpdateStatus = (id, newStatus) => {
    const updated = appointments.map(appt =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    );
    setAppointments(updated);
    applyFilter(filter, updated);
  };

 const applyFilter = (criteria, data = appointments) => {
  setFilter(criteria);
  if (criteria === 'All') {
    setFiltered(data);
  } else if (criteria === 'Pending') {
    setFiltered(data.filter(a => a.status === 'pending'));
  } else {
    setFiltered(data.filter(a => ['Accepted', 'Rejected'].includes(a.status)));
  }
};

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">📥 Your Appointment Requests</h4>

          <ButtonGroup>
            <Button variant={filter === 'All' ? 'dark' : 'outline-dark'} onClick={() => applyFilter('All')}>
              All
            </Button>
            <Button variant={filter === 'Pending' ? 'warning' : 'outline-warning'} onClick={() => applyFilter('Pending')}>
              Pending
            </Button>
            <Button variant={['Accepted', 'Rejected'].includes(filter) ? 'primary' : 'outline-primary'} onClick={() => applyFilter('Accepted')}>
              Responded
            </Button>
          </ButtonGroup>
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted">No matching requests found.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Client</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Respond</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((appt, index) => (
                <tr key={appt.id}>
                  <td>{index + 1}</td>
                  <td>{appt.service}</td>
                  <td>{appt.user}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>
                    <Badge bg={
                      appt.status === 'Accepted' ? 'success' :
                      appt.status === 'Rejected' ? 'danger' : 'warning'
                    }>
                      {appt.status}
                    </Badge>
                  </td>
                  <td>
                    {appt.status === 'pending' ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline-success"
                          className="me-2"
                          onClick={() => handleUpdateStatus(appt.id, 'Accepted')}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleUpdateStatus(appt.id, 'Rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span className="text-muted small">No action needed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default AppointmentRequests;