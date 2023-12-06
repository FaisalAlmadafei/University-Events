// src/components/EventsPage.js
import React from "react";
import MyEventsList from "./MyEventList";

function MyEventsPage({ userId }) {
  return (
    <div>
      <h1 style={{ width: "100%", textAlign: "center" }}>My Events List</h1>
      <MyEventsList userId={userId} />
    </div>
  );
}

export default MyEventsPage;
