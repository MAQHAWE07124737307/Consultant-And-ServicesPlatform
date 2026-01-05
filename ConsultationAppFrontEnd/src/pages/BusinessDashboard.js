import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(
  BarElement, LineElement, CategoryScale, LinearScale,
  PointElement, Tooltip, Legend, ArcElement
);

const BusinessDashboard = () => {
  const [report, setReport] = useState({
    summary: {
      totalBookings: 542,
      totalRevenue: 132000,
      activeServices: 18,
      newUsers: 102
    },
    bookingsByDepartment: {
      labels: ['Engineering', 'Finance', 'Legal', 'Wellness', 'Tech Support'],
      data: [158, 124, 92, 84, 71]
    },
    servicesByDepartment: {
      Engineering: 3,
      Finance: 3,
      Legal: 3,
      Wellness: 3,
      'Tech Support': 3,
      Creative: 3
    },
    revenueOverTime: [
      { date: '2025-06-01', total: 9500 },
      { date: '2025-06-02', total: 11200 },
      { date: '2025-06-03', total: 8650 },
      { date: '2025-06-04', total: 14300 },
      { date: '2025-06-05', total: 9900 },
      { date: '2025-06-06', total: 12000 },
      { date: '2025-06-07', total: 13250 }
    ]
  });

  // Charts prep
  const deptBar = {
    labels: report.bookingsByDepartment.labels,
    datasets: [{
      label: 'Bookings',
      data: report.bookingsByDepartment.data,
      backgroundColor: '#0d6efd'
    }]
  };

  const servicePie = {
    labels: Object.keys(report.servicesByDepartment),
    datasets: [{
      label: 'Services',
      data: Object.values(report.servicesByDepartment),
      backgroundColor: ['#0d6efd', '#198754', '#dc3545', '#ffc107', '#6f42c1', '#20c997']
    }]
  };

  const revenueLine = {
    labels: report.revenueOverTime.map(d => d.date),
    datasets: [{
      label: 'Revenue (R)',
      data: report.revenueOverTime.map(d => d.total),
      borderColor: '#198754',
      backgroundColor: 'rgba(25,135,84,0.2)',
      tension: 0.3,
      fill: true
    }]
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Admin Services Dashboard</h3>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <Card title="Total Bookings" value={report.summary.totalBookings} color="primary" />
        <Card title="Revenue" value={`R${report.summary.totalRevenue}`} color="success" />
        <Card title="Active Services" value={report.summary.activeServices} color="info" />
        <Card title="New Users" value={report.summary.newUsers} color="warning" />
      </div>

      {/* Charts Section */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h6>Bookings by Department</h6>
            <Bar data={deptBar} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <h6>Services Per Department</h6>
            <Pie data={servicePie} />
          </div>
        </div>
      </div>

      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">Revenue Trend This Week</h5>
        <Line data={revenueLine} />
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className="col-6 col-md-3">
    <div className={`card border-${color} text-${color}`}>
      <div className="card-body text-center">
        <div className="fw-semibold small text-uppercase">{title}</div>
        <div className="display-6 fw-bold">{value}</div>
      </div>
    </div>
  </div>
);

export default BusinessDashboard;