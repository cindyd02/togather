import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import page components
import Home from "./frontend/Home/Home";
import EventPage from "./frontend/EventTab/EventPage"; // Use EventPage instead
import GroupChat from "./frontend/Groupchat/Groupchat";
import Profile from "./frontend/Profile/Profile";
import Signing from "./frontend/Signin/Signin";
import UserIdentity from "./frontend/UserIdentity/UserIdentity";
import UserPreferences from "./frontend/UserPreferences/UserPreferences";
import SignUp from "./frontend/Signup/Signup";
import Swiping from "./frontend/Swiping/Swiping";

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventPage />} /> {/* Updated */}
          <Route path="/groupchat" element={<GroupChat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<Signing />} />
          <Route path="/user-identity" element={<UserIdentity />} />
          <Route path="/preferences" element={<UserPreferences />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/swiping" element={<Swiping />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
