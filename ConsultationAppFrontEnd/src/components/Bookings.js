import React, { useState, useEffect } from 'react';
import { Card, Table, ButtonGroup, Button, Badge, Spinner } from 'react-bootstrap';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:7280/api/Client/my-bookings", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();
        setBookings(data);
        setFiltered(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  // 🔎 Map numeric status to text
  const getStatusText = (status) => {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Accepted';
      case 2: return 'Cancelled';
      default: return 'Unknown';
    }
  };

  // 🔎 Map numeric status to badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 0: return 'warning';
      case 1: return 'success';
      case 2: return 'danger';
      default: return 'secondary';
    }
  };

  // 🔎 Apply filter
  const applyFilter = (criteria, data = bookings) => {
    setFilter(criteria);
    if (criteria === 'All') {
      setFiltered(data);
    } else {
      // Filter by numeric status
      const statusNumber = criteria === 'Pending' ? 0 : criteria === 'Accepted' ? 1 : 2;
      setFiltered(data.filter(b => b.status === statusNumber));
    }
  };

  // ❌ Cancel booking
  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://localhost:7280/api/Booking/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to cancel booking");

      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      applyFilter(filter, updated);
    } catch (error) {
      console.error(error);
      alert("❌ Could not cancel booking. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            My Bookings
            <ButtonGroup>
              {['All', 'Accepted', 'Pending', 'Cancelled'].map(status => (
                <Button
                  key={status}
                  variant={filter === status ? 'dark' : 'outline-dark'}
                  onClick={() => applyFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </ButtonGroup>
          </Card.Title>

          {loading ? (
            <div className="text-center mt-3">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Consultant</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status / Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => {
                    const start = new Date(b.slotStart);
                    return (
                      <tr key={b.id}>
                        <td>{b.serviceName}</td>
                        <td>{b.consultantName}</td>
                        <td>{start.toLocaleDateString()}</td>
                        <td>{start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td>
                          <Badge
                            bg={getStatusColor(b.status)}
                            className="me-2"
                          >
                            {getStatusText(b.status)}
                          </Badge>
                          {(b.status === 0 || b.status === 1) && (
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleCancel(b.id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyBookings;
