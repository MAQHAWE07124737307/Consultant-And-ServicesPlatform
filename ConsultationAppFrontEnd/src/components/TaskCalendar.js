import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enZA from 'date-fns/locale/en-ZA';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, Form } from 'react-bootstrap';

const locales = { 'en-ZA': enZA };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const initialEvents = [
  {
    title: 'Attend Meeting',
    start: new Date(2025, 5, 25, 10, 0),
    end: new Date(2025, 5, 25, 11, 0),
  },
  {
    title: 'Check Project',
    start: new Date(2025, 5, 26, 13, 0),
    end: new Date(2025, 5, 26, 14, 0),
  },
];

const TaskCalendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [show, setShow] = useState(false);
  const [task, setTask] = useState({ title: '', date: '', startTime: '', endTime: '' });
  const [view, setView] = useState('week');

  const handleAddTask = () => {
    const { title, date, startTime, endTime } = task;
    if (!title || !date || !startTime || !endTime) return;
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    setEvents([...events, { title, start, end }]);
    setShow(false);
    setTask({ title: '', date: '', startTime: '', endTime: '' });
  };

  return (
    <div
      className="bg-white p-3 rounded shadow-sm"
      style={{ minHeight: '600px', maxHeight: '90vh', overflowY: 'auto' }}
    >
      <Button variant="primary" className="mb-3" onClick={() => setShow(true)}>
        + Add Task
      </Button>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        view={view}
        onView={setView}
        views={['week', 'day', 'agenda']}
        selectable
        onSelectEvent={(event) => alert(`Task: ${event.title}`)}
        onSelectSlot={(slot) => console.log('Clicked time slot:', slot)}
        style={{ height: 600 }}
        eventPropGetter={() => ({
          style: {
            backgroundColor: '#0d6efd',
            fontSize: '1rem',
            padding: '10px',
            color: 'white',
          },
        })}
      />

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={task.date}
                onChange={(e) => setTask({ ...task, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={task.startTime}
                onChange={(e) => setTask({ ...task, startTime: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={task.endTime}
                onChange={(e) => setTask({ ...task, endTime: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddTask}>
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskCalendar;