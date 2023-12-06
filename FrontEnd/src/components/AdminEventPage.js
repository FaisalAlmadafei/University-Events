// src/components/EventsPage.js
import React from "react";
import AdminEventList from "./AdminEventList";

function AdminEventsPage({ userId }) {
  return (
    <div>
      <h1 style={{ width: "100%", textAlign: "center" }}>Events List</h1>
      <AdminEventList userId={userId} />
    </div>
  );
}

export default AdminEventsPage;
