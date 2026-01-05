import React from "react";
import ConsultantSidebar from "./StuffSidebar";
import UpcomingApts from "../components/UpcomingApts"; 



function ConsultantLayout() {
  return (
    <div className="app-container d-flex">
      <ConsultantSidebar />
      <main className="flex-grow-1 p-3">
        <UpcomingApts />
      </main>
    </div>
  );
}

export default ConsultantLayout;