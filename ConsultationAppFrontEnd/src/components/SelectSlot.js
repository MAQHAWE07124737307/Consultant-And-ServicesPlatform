import React, { useEffect, useState } from 'react';
import { Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const SelectSlot = ({ consultant, onConfirm }) => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  


  useEffect(() => {
    if (!consultant) return;

    const fetchSlots = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://localhost:7280/api/Slots/by-consultant/${consultant.userId}`
        );

        // Only available slots
        setSlots(res.data.filter(s => s.isAvailable));
      } catch (err) {
        console.error(err);
        setSlots([]);
      }
      setLoading(false);
    };
    

    fetchSlots();
  }, [consultant]);

  const handleSelect = (slot) => {
    setSelectedSlot(slot);
    onConfirm(slot); // 🔥 send to parent
  };

  return (
    <div className="container mt-4">
      <h4>🕒 Select an Available Slot</h4>

      

      {loading && <Spinner animation="border" />}

      {!loading && slots.length === 0 && (
        <Alert variant="warning">No available slots.</Alert>
      )}
      

      <div className="d-flex flex-wrap gap-2">
        {slots.map(slot => (
          <Button
  key={slot.id}
  variant={selectedSlot?.id === slot.id ? 'success' : 'outline-primary'}
  onClick={() => handleSelect(slot)}
>
  {new Date(slot.startTime).toLocaleDateString()} –{' '}
  {new Date(slot.startTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })} to{' '}
  {new Date(slot.endTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })}
</Button>
          
        ))}
      </div>
    </div>
  );
};

export default SelectSlot;
