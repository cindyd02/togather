import React, { useState } from "react";
import "./UserPreferences.css";

const UserPreferences = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [radius, setRadius] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Preferences saved!");
  };

  return (
    <div className="container">
        <h1>Let's get to know your preferences</h1>
        <p>Help us find the perfect group for you!</p>
        <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px", fontFamily: "Monaco"}}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
            <option value="no-preference">No Preference</option>

          </select>
        </div>
        <div>
          <label>Preferred Group Size:</label>
          <input
            type="number"
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            min="1"
            required
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Search Radius (miles):</label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            min="1"
            required
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default UserPreferences;
