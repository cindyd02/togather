import React, { useState, useRef } from "react";
import "./Swiping.css";

const Swiping = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [swipedDirection, setSwipedDirection] = useState(null);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handleTest = async () => {
    try {
      const response = await fetch('http://localhost:6000/test');  // Test endpoint
      const data = await response.text();  // Fetch response as text
      console.log(data);  // Should log 'Backend is working'
    } catch (error) {
      console.error('Error fetching test data:', error);
    }
  };  

  const filteredEvents = selectedCity === "All"
    ? events
    : events.filter((event) => event.location === selectedCity);

  const handleSwipe = (id, direction) => {
    console.log(`Swiped ${direction}: ${id}`);
    setSwipedDirection(direction);
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));

    setTimeout(() => {
      setSwipedDirection(null);
    }, 1000);
  };

  return (
    <div className="swipe-container">
      <h2>Swipe on Events</h2>
      <p className="swipe-note">Double click the event card to find out more info!</p> {/* Moved under header */}

      {/* City and Date Inputs */}
      <div className="search-filters">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border rounded"
        />
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="p-2 border rounded"
        >
          <option value="All">All Cities</option>
          <option value="New York City">New York City</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        {/* <button onClick={handleClick} className="search-button">
          Search
        </button> */}
        <button onClick={handleTest} className="search-button">
          Search
        </button>
      </div>

      <div className="swipe-card-container">
        {filteredEvents.map((event) => (
          <SwipeableCard
            key={event.id}
            event={event}
            onSwipe={handleSwipe}
            onDoubleClick={() => setSelectedEvent(event)} // Open modal on double click
          />
        ))}
      </div>

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      {swipedDirection && (
        <div className="swipe-indicator">
          {swipedDirection === "left" ? (
            <span className="swipe-x">❌</span>
          ) : (
            <span className="swipe-heart">❤️</span>
          )}
        </div>
      )}
    </div>
  );
};

const SwipeableCard = ({ event, onSwipe, onDoubleClick }) => {
  const cardRef = useRef(null);
  let startX = 0;
  let currentX = 0;
  const swipeThreshold = 50; // 👈 Reduced swipe distance

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const onDragStart = (e) => {
    startX = getClientX(e);
  };

  const onDragMove = (e) => {
    if (!startX) return;
    currentX = getClientX(e) - startX;
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${currentX}px) rotate(${currentX / 15}deg)`;
    }
  };

  const onDragEnd = () => {
    if (!cardRef.current) return;

    if (currentX > swipeThreshold) {
      cardRef.current.style.transform = "translateX(500px) rotate(20deg)";
      setTimeout(() => onSwipe(event.id, "right"), 200);
    } else if (currentX < -swipeThreshold) {
      cardRef.current.style.transform = "translateX(-500px) rotate(-20deg)";
      setTimeout(() => onSwipe(event.id, "left"), 200);
    } else {
      cardRef.current.style.transform = "translateX(0px) rotate(0deg)";
    }

    startX = 0;
    currentX = 0;
  };

  return (
    <div
      className="event-card"
      ref={cardRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={onDragStart}
      onTouchMove={onDragMove}
      onTouchEnd={onDragEnd}
      onDoubleClick={onDoubleClick} // 👈 Open modal on click
    >
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-info">
        <h3>{event.title}</h3>
        <p className="event-location">📍 {event.location}</p>
      </div>
    </div>
  );
};

const EventModal = ({ event, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>{event.title}</h2>
        <img src={event.image} alt={event.title} className="modal-image" />
        <p className="modal-description">{event.description}</p>
        <p><strong>📍 Location:</strong> {event.location}</p>
        <p><strong>📅 Date:</strong> {event.date}</p>
      </div>
    </div>
  );
};

export default Swiping;
