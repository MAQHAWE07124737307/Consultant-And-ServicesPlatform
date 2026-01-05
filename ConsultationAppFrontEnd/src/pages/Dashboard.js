
import React, { useState } from 'react';
import { Card, Row, Col, Table, ListGroup } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskCalendar from '../components/TaskCalendar';
import AnalyticsCard from '../components/AnalyticsCard';





const Dashboard = () => {

  const [date, setDate] = useState(new Date());
  const stats = [
    { title: 'Total Appointments', value: 128, icon: 'calendar-check', color: 'primary' },
    { title: 'Upcoming Today', value: 7, icon: 'clock', color: 'success' },
    { title: 'Available Staff', value: 4, icon: 'user-check', color: 'warning' },
    { title: 'New Clients', value: 15, icon: 'users', color: 'info' }
  ];

  const sampleAppointments = [
    { customer: 'John Doe', time: '10:00 AM', service: 'Fade Cut', status: 'Confirmed' },
    { customer: 'Lerato M.', time: '11:30 AM', service: 'Beard Trim', status: 'Pending' },
    { customer: 'Sipho N.', time: '1:00 PM', service: 'Full Package', status: 'Cancelled' }
  ];

  const services = ['Fade Cut', 'Beard Trim', 'Hair Wash', 'Full Package'];

  return (
    <div>
      {/* Top Stats */}
      <Row className="mb-4">
        {stats.map((item, idx) => (
          <Col key={idx} md={6} lg={3}>
            <Card bg={item.color} text="white" className="shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{item.title}</h6>
                  <h4>{item.value}</h4>
                </div>
                <i className={`fas fa-${item.icon} fa-2x`} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <AnalyticsCard />


      <h5 className="mt-5 mb-3">Admin Schedule</h5>
<TaskCalendar />


    </div>
  );
};

export default Dashboard;