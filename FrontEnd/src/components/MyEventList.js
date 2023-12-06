// src/components/MyEventsList.js
import React, { useState, useEffect } from "react";
import MyEventCard from "./MyEventCard";
import "./EventsList.css";

function MyEventsList({ userId }) {
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `https://localhost:7183/api/My/getUserEvents/ID=${userId}`,
        );
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

    if (userId) {
      fetchEvents();
    }
  }, []);

  return (
    <div className="events-list-container">
      {!isLoaded && <div>Loading events...</div>}
      {isLoaded &&
        events.map((event) => (
          <MyEventCard key={event.id} {...event} userId={userId} />
        ))}
    </div>
  );
}

export default MyEventsList;
