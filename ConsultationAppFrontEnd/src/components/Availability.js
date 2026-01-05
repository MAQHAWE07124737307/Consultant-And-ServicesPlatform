import React, { useState } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';

const initialAvailability = [
  { day: 'Monday', available: true, start: '09:00', end: '17:00' },
  { day: 'Tuesday', available: true, start: '09:00', end: '17:00' },
  { day: 'Wednesday', available: true, start: '09:00', end: '17:00' },
  { day: 'Thursday', available: true, start: '09:00', end: '17:00' },
  { day: 'Friday', available: true, start: '09:00', end: '17:00' },
  { day: 'Saturday', available: false, start: '09:00', end: '12:00' },
  { day: 'Sunday', available: false, start: '09:00', end: '12:00' },
];

const AvailabilityManager = () => {
  const [availability, setAvailability] = useState(initialAvailability);
  const [saved, setSaved] = useState(false);

  const updateDay = (index, field, value) => {
    const newAvail = [...availability];
    newAvail[index][field] = field === 'available' ? value.target.checked : value.target.value;
    setAvailability(newAvail);
    setSaved(false);
  };

  const handleSave = () => {
    console.log('🗂️ Saved Availability:', availability);
    setSaved(true);
  };

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm">
        <h4 className="mb-3">📅 Availability Manager</h4>
        {availability.map((slot, idx) => (
          <Row key={slot.day} className="align-items-center mb-3">
            <Col md={3}>
              <strong>{slot.day}</strong>
            </Col>
            <Col md={2}>
              <Form.Check
                type="switch"
                label="Available"
                checked={slot.available}
                onChange={e => updateDay(idx, 'available', e)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="time"
                disabled={!slot.available}
                value={slot.start}
                onChange={e => updateDay(idx, 'start', e)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="time"
                disabled={!slot.available}
                value={slot.end}
                onChange={e => updateDay(idx, 'end', e)}
              />
            </Col>
          </Row>
        ))}
        <Button variant="primary" onClick={handleSave}>
          Save Availability
        </Button>
        {saved && <div className="text-success mt-2">✅ Availability saved (locally)</div>}
      </Card>
    </div>
  );
};

export default AvailabilityManager;