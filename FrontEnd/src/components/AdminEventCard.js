import React from "react";
import "./AdminEventCard.css";
import { useNavigate } from "react-router-dom";

function AdminEventCard({
  eventId,
  eventDate,
  eventName,
  eventLocation,
  eventTime,
  eventDescription,
  eventImage,
  likes,
  dislikes,
}) {
  const handleDelete = async () => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `https://localhost:7183/api/My/DeleteEvent?eventName=${eventName}`,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));

    alert("Event Deleted !");
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
        <p>Likes: {likes}</p>
        <p>DisLikes: {dislikes}</p>
      </div>
      <button className="event-AdminCard-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default AdminEventCard;
