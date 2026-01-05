import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5062/api/Services/Get-service-with-consultants')
      .then(res => setServices(res.data))
      .catch(err => console.error('Failed to fetch services:', err));
  }, []);

  const filteredServices = services.filter(s =>
    s.serviceName.toLowerCase().includes(search.toLowerCase()) ||
    s.departmentName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h4 className="mb-4">📋 Service Directory</h4>

      {/* 🔍 Search */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search by service or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🗂️ Table View */}
      <table className="table table-bordered table-hover">
        <thead className="table-light text-uppercase">
          <tr>
            <th>Service</th>
            <th>Department</th>
            <th>Fee</th>
            <th>Consultants</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map(service => (
            <tr key={service.serviceId}>
              <td>{service.serviceName}</td>
              <td>{service.departmentName}</td>
              <td>R{service.fee.toLocaleString()}</td>
              <td>
                {service.consultants.length > 0 ? (
                  <ul className="mb-0 ps-3">
                    {service.consultants.map(c => (
                      <li key={c.consultantId}>
                        {c.fullName} ({c.email})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted">No consultants assigned</span>
                )}
              </td>
            </tr>
          ))}
          {filteredServices.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-muted">No matching services found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesPage;