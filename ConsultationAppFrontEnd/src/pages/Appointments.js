import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token'); // get the JWT
      if (!token) return console.error('No token found');

      try {
        const res = await axios.get(
          'https://localhost:7280/api/Consultants/consultant/c542ca7a-a6e2-41a0-99c2-33cb9afced41',
          {
            headers: {
              Authorization: `Bearer ${token}`, // send token in header
            },
          }
        );
        setAppointments(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err.response || err);
      }
    };

    fetchAppointments();
  }, []);

  // Filter appointments by status or date
  const filteredAppointments = appointments.filter((a) => {
    return (
      (statusFilter ? a.status === parseInt(statusFilter) : true) &&
      (dateFilter ? new Date(a.slotStart).toISOString().split('T')[0] === dateFilter : true)
    );
  });

  // Convert status number to string
  const statusToString = (status) => {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Approved';
      case 2: return 'Rejected';
      default: return 'Unknown';
    }
  };

  const statusToColor = (status) => {
    switch (status) {
      case 0: return 'warning';
      case 1: return 'success';
      case 2: return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="container py-4">
      {/* Filter Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 d-flex gap-3">
          <select
            className="form-select w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="0">Pending</option>
            <option value="1">Approved</option>
            <option value="2">Rejected</option>
          </select>

          <input
            type="date"
            className="form-control w-auto"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Appointments Table */}
      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light text-uppercase">
            <tr>
              <th>ID</th>
              <th>Consultant</th>
              <th>Service</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.consultantName}</td>
                  <td>{a.serviceName}</td>
                  <td>{new Date(a.slotStart).toLocaleString()}</td>
                  <td>{new Date(a.slotEnd).toLocaleString()}</td>
                  <td>
                    <span className={`badge bg-${statusToColor(a.status)}`}>
                      {statusToString(a.status)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsPage;
