import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./Swiping.css"; // Ensure this file has styles for positioning

const eventsData = [
  { id: 1, name: "Music Festival", date: "March 10, 2025", location: "NYC" },
  { id: 2, name: "Tech Conference", date: "April 15, 2025", location: "San Francisco" },
  { id: 3, name: "Food Carnival", date: "May 5, 2025", location: "Los Angeles" },
  { id: 4, name: "Art Exhibition", date: "June 20, 2025", location: "Chicago" },
];

const Swiping = () => {
  const [events, setEvents] = useState(eventsData);
  const [lastDirection, setLastDirection] = useState(null);

  const swipeHandler = (eventName, direction) => {
    setLastDirection(direction);
    console.log(`${eventName} swiped ${direction}`);
  };

  const handlers = useSwipeable({
    onSwipedLeft: (e) => swipeHandler(e.event.target.innerText, "left"),
    onSwipedRight: (e) => swipeHandler(e.event.target.innerText, "right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="swipe-container">
      <h2>Swipe on Events</h2>
      <div className="swipe-card-container">
        {events.map((event) => (
          <div
            className="event-card"
            key={event.id}
            {...handlers}
          >
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.location}</p>
          </div>
        ))}
      </div>
      {lastDirection && <p className="info-text">You swiped {lastDirection}</p>}
    </div>
  );
};

export default Swiping;
