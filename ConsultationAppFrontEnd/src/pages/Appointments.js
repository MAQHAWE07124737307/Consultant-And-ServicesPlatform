import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5062/api/AppointmentsControler/GetFormattedAppointments')
      .then(res => setAppointments(res.data))
      .catch(err => console.error('Failed to fetch appointments:', err));
  }, []);

  const filteredAppointments = appointments.filter((a) => {
    return (
      (statusFilter ? a.status.toLowerCase() === statusFilter.toLowerCase() : true) &&
      (departmentFilter ? a.department === departmentFilter : true) &&
      (dateFilter ? a.date === dateFilter : true)
    );
  });

  const total = appointments.length;
  const confirmed = appointments.filter((a) => a.status.toLowerCase() === 'confirmed').length;
  const pending = appointments.filter((a) => a.status.toLowerCase() === 'pending').length;
  const cancelled = appointments.filter((a) => a.status.toLowerCase() === 'cancelled').length;

  const departments = [...new Set(appointments.map(a => a.department).filter(Boolean))];

  return (
    <div className="container py-4">
      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <SummaryCard label="Total Bookings" count={total} color="primary" />
        <SummaryCard label="Confirmed" count={confirmed} color="success" />
        <SummaryCard label="Pending" count={pending} color="warning" />
        <SummaryCard label="Cancelled" count={cancelled} color="danger" />
      </div>

      {/* Filter Row */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap gap-3">
            <select
              className="form-select w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              className="form-select w-auto"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((dept, i) => (
                <option key={i} value={dept}>{dept}</option>
              ))}
            </select>

            <input
              type="date"
              className="form-control w-auto"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light text-uppercase">
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Department</th>
              <th>Service</th>
              <th>Consultant</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((a, i) => (
              <tr key={i}>
                <td>{a.id}</td>
                <td>{a.user}</td>
                <td>{a.department || '—'}</td>
                <td>{a.service}</td>
                <td>{a.consultant}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>
                  <span className={`badge bg-${statusToColor(a.status)}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredAppointments.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No bookings found for selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, count, color }) => (
  <div className="col-6 col-md-3">
    <div className={`card text-${color} border-${color}`}>
      <div className="card-body text-center">
        <h6 className="card-title text-uppercase">{label}</h6>
        <h2 className="card-text fw-bold">{count}</h2>
      </div>
    </div>
  </div>
);

const statusToColor = (status) => {
  switch (status.toLowerCase()) {
    case 'confirmed': return 'success';
    case 'pending': return 'warning';
    case 'cancelled': return 'danger';
    default: return 'secondary';
  }
};

export default AppointmentsPage;