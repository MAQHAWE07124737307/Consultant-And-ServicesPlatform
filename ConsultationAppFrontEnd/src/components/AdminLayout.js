import React from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";

function AdminLayout() {
  return (
    <div className="app-container d-flex">
      <Sidebar />
      <main className="flex-grow-1 p-3">
        <Dashboard />
      </main>
    </div>
  );
}

export default AdminLayout;