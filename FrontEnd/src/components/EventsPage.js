// src/components/EventsPage.js
import React from "react";
import EventsList from "./EventsList";

function EventsPage({ userId }) {
  return (
    <div>
      <h1 style={{ width: "100%", textAlign: "center" }}>Events List</h1>
      <EventsList userId={userId} />
    </div>
  );
}

export default EventsPage;
