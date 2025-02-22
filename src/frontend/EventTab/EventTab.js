import React from "react";

const EventTab = ({ events }) => {
  return (
    <div>
      <h1>Events You're Attending</h1>
      {events.length > 0 ? (
        events.map((event, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <h2>{event.name}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p>{event.description}</p>
          </div>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventTab;
