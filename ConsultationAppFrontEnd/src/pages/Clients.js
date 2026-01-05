import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

const statusToColor = (status) => {
  switch (status) {
    case 'Active': return 'success';
    case 'Inactive': return 'secondary';
    default: return 'warning';
  }
};

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5062/api/Users/GetAllUsers')
      .then(res => {
        const filtered = res.data
          .filter(u => u.role === 'Client')
          .map(u => ({
            id: `CUST-${u.id.toString().padStart(3, '0')}`,
            name: u.fullName,
            email: u.email,
            phone: u.phone,
            joined: '2025-07-01', // Placeholder — update if you have actual join date
            status: 'Active' // Default status — can be dynamic later
          }));
        setClients(filtered);
      })
      .catch(err => console.error('Failed to fetch clients:', err));
  }, []);

  const handleEdit = (client) => {
    setSelectedClient({ ...client });
    const modal = new window.bootstrap.Modal(document.getElementById('clientModal'));
    modal.show();
  };

  const handleSave = () => {
    setClients(prev =>
      prev.map(c => c.id === selectedClient.id ? selectedClient : c)
    );
    const modal = window.bootstrap.Modal.getInstance(document.getElementById('clientModal'));
    modal.hide();
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (statusFilter ? client.status === statusFilter : true)
  );

  return (
    <div className="container py-4">
      {/* Summary */}
      <div className="row g-3 mb-4">
        <SummaryCard label="Total Clients" count={clients.length} color="primary" />
        <SummaryCard label="Active" count={clients.filter(c => c.status === 'Active').length} color="success" />
        <SummaryCard label="Inactive" count={clients.filter(c => c.status === 'Inactive').length} color="secondary" />
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Search by name..."
            value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light text-uppercase">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.joined}</td>
                <td><span className={`badge bg-${statusToColor(client.status)}`}>{client.status}</span></td>
                <td>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(client)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr><td colSpan="7" className="text-center text-muted">No clients found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <div className="modal fade" id="clientModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Client</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedClient && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" value={selectedClient.name}
                      onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" value={selectedClient.email}
                      onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={selectedClient.status}
                      onChange={(e) => setSelectedClient({ ...selectedClient, status: e.target.value })}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
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

export default ClientsPage;