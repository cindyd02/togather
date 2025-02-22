import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import your page components
import Home from "./frontend/Home/Home";
import EventTab from "./frontend/EventTab/EventTab";
import GroupChat from "./frontend/Groupchat/Groupchat";
import Profile from "./frontend/Profile/Profile";
import Signing from "./frontend/Signin/Signin";
import UserIdentity from "./frontend/UserIdentity/UserIdentity";
import UserPreferences from "./frontend/UserPreferences/UserPreferences";

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventTab />} />
          <Route path="/groupchat" element={<GroupChat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<Signing />} />
          <Route path="/user-identity" element={<UserIdentity />} />
          <Route path="/preferences" element={<UserPreferences />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
