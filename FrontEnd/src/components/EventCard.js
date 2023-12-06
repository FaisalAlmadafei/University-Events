import React from "react";
import "./EventCard.css";
import QRCode from "qrcode";

function EventCard({
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
  const uploadToImgur = async (blob, fileName) => {
    const formData = new FormData();
    formData.append("image", blob, fileName);

    try {
      const response = await fetch("https://api.imgur.com/3/image/", {
        method: "POST",
        headers: {
          Authorization: "Client-ID 35f13795a3b8cd4",
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        return data.data.link; // Return the link of the uploaded image
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const qrData = `User: ${userId}, Event: ${eventId}`;
      const qrDataURL = await QRCode.toDataURL(qrData);

      // Convert QR data URL to blob (Binary large object)
      const qrResponse = await fetch(qrDataURL);
      const blob = await qrResponse.blob();

      // Upload QR code to Imgur and get the link by calling the method
      const uploadedImageUrl = await uploadToImgur(blob, "event_qrcode.png");

      if (uploadedImageUrl) {
        const response = await fetch(
          `https://localhost:7183/api/My/ChoseEvent?User_Id=${userId}&Event_Id=${eventId}&EventTicket=${uploadedImageUrl}`,
          {
            method: "POST",
            redirect: "follow",
          },
        );

        const result = await response.text();
        console.log(result);
        alert("Registration successful!");
      } else {
        alert("Failed to generate QR code for registration.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register for the event.");
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
        <p>Likes: {likes}</p>
        <p>DisLikes: {dislikes}</p>
      </div>
      <button className="event-card-btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default EventCard;
