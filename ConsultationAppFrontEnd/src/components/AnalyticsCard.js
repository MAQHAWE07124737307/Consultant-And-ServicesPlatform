import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid
} from 'recharts';

const dailyData = [
  { date: 'Mar 1', value: 12000 },
  { date: 'Mar 4', value: 18500 },
  { date: 'Mar 7', value: 9500 },
  { date: 'Mar 10', value: 21500 },
  { date: 'Mar 13', value: 14500 },
];

const monthlyData = [
  { month: 'Jan', value: 4000 },
  { month: 'Feb', value: 6500 },
  { month: 'Mar', value: 7200 },
  { month: 'Apr', value: 8800 },
  { month: 'May', value: 11500 },
  { month: 'Jun', value: 14250 },
];

const AnalyticsCard = () => {
  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-white fw-bold text-dark">📊 Business Analytics</Card.Header>
      <Card.Body>
        <Row>
          <Col md={6} className="mb-4">
            <h6 className="text-secondary">Daily Performance</h6>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0d6efd" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#0d6efd" fill="url(#colorBlue)" />
              </AreaChart>
            </ResponsiveContainer>
          </Col>

          <Col md={6}>
            <h6 className="text-secondary">Monthly Trend</h6>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#198754" barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AnalyticsCard;