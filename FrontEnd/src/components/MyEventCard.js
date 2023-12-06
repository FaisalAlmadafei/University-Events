import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./EventCard.css";

function MyEventCard({
  eventId,
  eventDate,
  eventName,
  eventLocation,
  eventTime,
  eventDescription,
  eventImage,
  userId,
  likes,
  dislikes,
}) {
  const [eventLikes, setEventLikes] = useState(likes);
  const [eventDisLikes, setEventDisLikes] = useState(dislikes);

  const cookieKey = `event-${eventId}-user-${userId}-reacted`;

  const hasUserReacted = () => Cookies.get(cookieKey);

  useEffect(() => {
    if (eventLikes !== likes) {
      const requestOptions = {
        method: "PUT",
        redirect: "follow",
      };

      fetch(
        `https://localhost:7183/api/My/updateEventLikes?Event_Id=${eventId}&_Likes=${eventLikes}`,
        requestOptions,
      )
        .then((response) => response.text())
        .then((result) => console.log("Updated likes:", result))
        .catch((error) => console.log("error", error));
    }
  }, [eventLikes, likes]);

  useEffect(() => {
    if (eventDisLikes !== dislikes) {
      const requestOptions = {
        method: "PUT",
        redirect: "follow",
      };

      fetch(
        `https://localhost:7183/api/My/updateEventDisLikes?Event_Id=${eventId}&_DisLikes=${eventDisLikes}`,
        requestOptions,
      )
        .then((response) => response.text())
        .then((result) => console.log("Updated dislikes:", result))
        .catch((error) => console.log("error", error));
    }
  }, [eventDisLikes, dislikes]);

  const handleReaction = (isLike) => {
    if (!hasUserReacted()) {
      if (isLike) {
        setEventLikes((prevLikes) => prevLikes + 1);
      } else {
        setEventDisLikes((prevDislikes) => prevDislikes + 1);
      }
      Cookies.set(cookieKey, "true", { expires: 365 });
    } else {
      alert("Sorry, you have already voted 🤷‍♀️");
    }
  };

  return (
    <div className="event-card">
      <img src={eventImage} alt={eventName} className="event-card-img" />
      <div className="event-card-header">{eventName}</div>
      <div className="event-card-body">
        <p>{eventDescription}</p>
        <p>{eventLocation}</p>
        <p>Starts on: {eventTime}</p>
        <p>Event date: {eventDate}</p>

        <button
          className="Likes-btn"
          onClick={() => handleReaction(true)}
          style={{ color: "white" }}
        >
          👍 {eventLikes}
        </button>
        <button
          className="DisLikes-btn"
          onClick={() => handleReaction(false)}
          style={{ color: "white" }}
        >
          👎 {eventDisLikes}
        </button>
      </div>
    </div>
  );
}

export default MyEventCard;
