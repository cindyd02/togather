import React, { useState, useRef } from "react";
import "./Swiping.css";

// REPLACE WITH SCRAPED DATA
const eventsData = [
  {
    id: 1,
    title: "Music Festival",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Experience an electrifying night of live music.",
    location: "New York City",
  },
  {
    id: 2,
    title: "Tech Conference",
    image: "https://plus.unsplash.com/premium_photo-1681487469745-91d1d8a5836b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Join the top minds in tech and innovation.",
    location: "San Francisco",
  },
  {
    id: 3,
    title: "Food Carnival",
    image: "https://plus.unsplash.com/premium_photo-1664206613168-32650e8b63a0?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Taste delicious treats from around the world.",
    location: "Los Angeles",
  },
  {
    id: 4,
    title: "Art Exhibition",
    image: "https://images.unsplash.com/photo-1600903781679-7ea3cbc564c3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Explore breathtaking artwork from talented artists.",
    location: "Chicago",
  },
];

const Swiping = () => {
  const [events, setEvents] = useState(eventsData);
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

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/scrapeSite?city=${selectedCity}&date=${selectedDate}`);
      const data = await response.json();

      const updatedEvents = data.events.map((event, index) => ({
        id: index + 1, 
        title: event.title,
        image: event.imgSrc,
        description: event.description,
        location: event.location || "Unknown Location", 
      }));

      setEvents(updatedEvents);
      console.log(updatedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

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
      <div className="left-side">
        <h2>Swipe on Events</h2>
        <p className="swipe-note">Double click the event card to find out more info!</p>

        {/* City and Date Selectors */}
        <div className="selector-container">
          <div className="city-selector">
            <label htmlFor="city">Choose a city:</label>
            <select id="city" value={selectedCity} onChange={handleCityChange}>
              <option value="All">All Cities</option>
              <option value="New York City">New York City</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>

          <div className="date-selector">
            <label htmlFor="date">Choose a date:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>

        {/* Button to trigger event fetching */}
        <div className="fetch-button-container">
          <button onClick={fetchEvents}>Fetch Events</button>
        </div>
      </div>

      <div className="right-side">
        <div className="swipe-card-container">
          {events.map((event) => (
            <SwipeableCard
              key={event.id}
              event={event}
              onSwipe={handleSwipe}
              onDoubleClick={() => setSelectedEvent(event)} // Open modal on double click
            />
          ))}
        </div>
      </div>

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      {swipedDirection && (
  <div className="swipe-indicator">
    <div className="circle"></div> {/* Circle behind the icon */}
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
