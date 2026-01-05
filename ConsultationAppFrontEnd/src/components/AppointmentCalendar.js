import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enZA from 'date-fns/locale/en-ZA';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-ZA': enZA };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AppointmentCalendar = ({ bookings }) => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('week');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      const mappedEvents = bookings.map(b => ({
        id: b.id,
        title: `${b.serviceName} with ${b.consultantName}`,
        start: new Date(b.slotStart),
        end: new Date(b.slotEnd),
        status: b.status
      }));

      setEvents(mappedEvents);
    }
  }, [bookings]);

  return (
    <div className="bg-white p-3 rounded shadow-sm" style={{ height: '600px' }}>
      <h4 className="mb-3">📅 Bookings Calendar</h4>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        defaultView="week"
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor:
              event.status === "Accepted" ? "#198754" :
              event.status === "Pending" ? "#ffc107" :
              "#dc3545", // Rejected
            color: 'white',
            borderRadius: '4px',
            padding: '6px'
          }
        })}
      />
    </div>
  );
};

export default AppointmentCalendar;