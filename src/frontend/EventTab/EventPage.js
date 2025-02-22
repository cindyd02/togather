// TEMPORARY UNTIL OLIVIA GETS DATA

import React, { useState } from "react";
import EventTab from "../EventTab/EventTab";

const EventPage = () => {
  const [events, setEvents] = useState([
    {
      name: "Tech Conference 2025",
      date: "March 15, 2025",
      location: "San Francisco, CA",
      description: "A conference for tech enthusiasts and professionals.",
    },
    {
      name: "Music Festival",
      date: "April 22, 2025",
      location: "Los Angeles, CA",
      description: "A weekend of amazing live music performances.",
    },
  ]);

  return <EventTab events={events} />;
};

export default EventPage;
