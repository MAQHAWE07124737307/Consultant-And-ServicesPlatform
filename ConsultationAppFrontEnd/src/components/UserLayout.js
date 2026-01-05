import React from "react";
import UserSidebar from "../components/UserSidebar";
import UserDashboard from "../pages/UserDashboard";

function UserLayout() {
  return (
    <div className="app-container d-flex">
      <UserSidebar />
      <main className="flex-grow-1 p-3">
        <UserDashboard />
      </main>
    </div>
  );
}

export default UserLayout;