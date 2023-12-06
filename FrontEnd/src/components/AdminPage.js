import React, { useState } from "react";
import "./AdminPage.css";
import "./Form.css";

function AdminPage() {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Function to upload image to Imgur
  const uploadToImgur = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    setUploadingImage(true);

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
        setEventImage(data.data.link);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadToImgur(file);
    }
  };

  const handleSubmit = async (e) => {
    if (uploadingImage) {
      alert("Please wait for the image to finish uploading.");
      return;
    }

    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `https://localhost:7183/api/My/addEvnets?Event_Name=${eventName}&Event_Location=${eventLocation}&_Capacity=${capacity}&Event_Time=${eventTime}&event_Date=${eventDate}&Event_Description=${eventDescription}&Event_Image=${eventImage}`,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    alert("Event Uploded");
  };

  return (
    <form id="Admin-form" onSubmit={handleSubmit}>
      <div>
        <label>Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </div>

      <div>
        <label>Event Location:</label>
        <input
          type="text"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
      </div>

      <div>
        <label>Capacity:</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>

      <div>
        <label>Event Time:</label>
        <input
          type="text"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
      </div>

      <div>
        <label>Event Date:</label>
        <input
          type="text"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </div>

      <div>
        <label>Event Description:</label>
        <textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Upload Event Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {uploadingImage && <p>Uploading image...</p>}
      </div>

      <button id="submit-event" type="submit">
        Submit Event
      </button>
    </form>
  );
}

export default AdminPage;
