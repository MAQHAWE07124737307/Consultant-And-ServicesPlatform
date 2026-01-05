import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', staffId: '' });

  useEffect(() => {
    axios.get('http://localhost:5062/api/Users/GetAllUsers')
      .then(res => {
        const approvedConsultants = res.data.filter(u => u.isConsultantApproved);
        const formattedStaff = approvedConsultants.map(u => ({
          id: u.id,
          name: u.fullName,
          email: u.email,
          phone: u.phone,
          status: 'Available' // default status for now
        }));
        setStaff(formattedStaff);
      })
      .catch(err => console.error('Failed to fetch staff:', err));

    // Optional: Load services from backend later
    setServices([]);
  }, []);

  const handleAddService = () => {
    if (!newService.name || !newService.staffId) return;
    const id = Date.now();
    setServices([...services, { id, ...newService }]);
    setNewService({ name: '', staffId: '' });
  };

  const getServicesFor = (staffId) => services.filter(s => s.staffId === staffId);

  return (
    <div className="container py-4">
      <h4 className="mb-4">🧑‍💼 Approved Consultants & Assigned Services</h4>

      {/* Assign Service */}
      <div className="mb-4 d-flex flex-wrap gap-2">
        <input
          className="form-control w-auto"
          placeholder="Service name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <select
          className="form-select w-auto"
          value={newService.staffId}
          onChange={(e) => setNewService({ ...newService, staffId: e.target.value })}
        >
          <option value="">Select Consultant</option>
          {staff.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleAddService}>Assign Service</button>
      </div>

      {/* Staff Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.status}</td>
              <td>
                {getServicesFor(s.id).length > 0 ? (
                  getServicesFor(s.id).map(service => (
                    <div key={service.id} className="text-muted small">• {service.name}</div>
                  ))
                ) : (
                  <span className="text-muted">No services assigned</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffPage;