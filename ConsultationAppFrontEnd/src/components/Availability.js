import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';

const defaultDays = [
  { day: 'Monday', available: false, start: '09:00', end: '17:00' },
  { day: 'Tuesday', available: false, start: '09:00', end: '17:00' },
  { day: 'Wednesday', available: false, start: '09:00', end: '17:00' },
  { day: 'Thursday', available: false, start: '09:00', end: '17:00' },
  { day: 'Friday', available: false, start: '09:00', end: '17:00' },
  { day: 'Saturday', available: false, start: '09:00', end: '12:00' },
  { day: 'Sunday', available: false, start: '09:00', end: '12:00' },
];

const AvailabilityManager = ({ consultantId }) => {
  const [availability, setAvailability] = useState(defaultDays);
  const [saved, setSaved] = useState(false);

  // 1️⃣ Fetch backend slots
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(`/api/slots/by-consultant/${consultantId}`);
        if (!res.ok) throw new Error('Failed to fetch availability');

        const data = await res.json();

        // Merge backend slots with default days
        const formatted = defaultDays.map(day => {
          const slotForDay = data.find(s => {
            const weekday = new Date(s.startTime).toLocaleString('en-US', { weekday: 'long' });
            return weekday === day.day;
          });

          if (slotForDay) {
            return {
              day: day.day,
              start: slotForDay.startTime.slice(11,16), // HH:MM
              end: slotForDay.endTime.slice(11,16),
              available: true
            };
          }

          return day; // keep default
        });

        setAvailability(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAvailability();
  }, [consultantId]);

  // 2️⃣ Update toggle or time
  const updateDay = (index, field, value) => {
    const newAvail = [...availability];
    newAvail[index][field] = field === 'available' ? value.target.checked : value.target.value;
    setAvailability(newAvail);
    setSaved(false);
  };

  // 3️⃣ Save to backend
  const handleSave = async () => {
    const payload = availability.map(slot => ({
      dayOfWeek: slot.day,
      startTime: slot.start,
      endTime: slot.end,
      isAvailable: slot.available
    }));

    try {
      const res = await fetch(`/api/consultant-availability/${consultantId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save availability');

      setSaved(true);
      console.log('🗂️ Availability saved to backend');
    } catch (err) {
      console.error(err);
      alert('Error saving availability to backend');
    }
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
        {saved && <div className="text-success mt-2">✅ Availability saved to backend</div>}
      </Card>
    </div>
  );
};

export default AvailabilityManager;
