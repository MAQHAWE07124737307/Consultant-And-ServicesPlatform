import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import AppointmentsDashboard from './pages/Appointments';
import InvoicesPage from './pages/Services';
import StaffPage from './pages/Staff';
import ClientsPage from './pages/Clients';
import BusinessDashboard from './pages/BusinessDashboard';
import Logout from './pages/Logout';
import LoginPage from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import BookService from './pages/BookService';
import ProfilePage from './pages/profilepage';
import UserBookingsDashboard from './components/UpcomingApts';
import AppointmentRequests from './components/AppointmentsRequest';
import AvailabilityManager from './components/Availability';
import MyBookings from './components/Bookings';
import ConsultantSidebar from './components/StuffSidebar';
import Sidebar from './components/Sidebar';
import UserSidebar from './components/UserSidebar';
import SignUp from './pages/signup';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';
import ConsultantLayout from './components/ConsultantLayout';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<LoginPage />} />

        <Route path="/ConsultantSidebar" element={<ConsultantSidebar/>}/>

        <Route path="/UserSidebar" element={<UserSidebar/>}/>

        <Route path ="/Sidebar" element={<Sidebar/>}/>

        
  <Route path="/admin/dashboard" element={<AdminLayout />} />
  <Route path="/consultant/dashboard" element={<ConsultantLayout />} />
  <Route path="/user/dashboard" element={<UserLayout />} />



        
        {/* Role-based layout wraps these routes */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/appointments" element={<Layout><AppointmentsDashboard /></Layout>} />
        <Route path="/services" element={<Layout><InvoicesPage /></Layout>} />
        <Route path="/staff" element={<Layout><StaffPage /></Layout>} />
        <Route path="/clients" element={<Layout><ClientsPage /></Layout>} />
        <Route path="/reports" element={<Layout><BusinessDashboard /></Layout>} />
        <Route path="/logout" element={<Layout><Logout /></Layout>} />
        <Route path="/user-dashboard" element={<Layout><UserDashboard /></Layout>} />
        <Route path="/book-service" element={<Layout><BookService /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/UpcomingApts" element={<Layout><UserBookingsDashboard /></Layout>} />
        <Route path="/appointmentrequests" element={<Layout><AppointmentRequests /></Layout>} />
        <Route path="/availability" element={<Layout><AvailabilityManager /></Layout>} />
        <Route path="/mybookings" element={<Layout><MyBookings /></Layout>} />
        
      </Routes>
    </Router>
  );
};

export default App;