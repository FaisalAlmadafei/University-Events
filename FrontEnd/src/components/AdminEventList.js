import React, { useState, useEffect } from "react";
import AdminEventCard from "./AdminEventCard";
import "./EventsList.css";
function AdminEventsList({ userId }) {
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("https://localhost:7183/api/My/GetEvnets");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="events-list-container">
      {!isLoaded && <div>Loading events...</div>}
      {isLoaded &&
        events.map((event) => (
          <AdminEventCard key={event.id} {...event} userId={userId} />
        ))}
    </div>
  );
}

export default AdminEventsList;
