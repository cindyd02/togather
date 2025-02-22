import React, { useState } from "react";
import "./UserIdentity.module.css";

const UserIdentity = () => {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [hometown, setHometown] = useState("");
  const [interests, setInterests] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        <div>
          <label>Name: <span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Age: <span style={{ color: "red" }}>*</span></label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Gender: <span style={{ color: "red" }}>*</span></label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ marginRight: "10px", display: "inline-block" }}>
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label style={{ marginRight: "10px", display: "inline-block" }}>
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label style={{ marginRight: "10px", display: "inline-block" }}>
              <input
                type="radio"
                value="non-binary"
                checked={gender === "non-binary"}
                onChange={(e) => setGender(e.target.value)}
              />
              Non-binary
            </label>
            <label style={{ marginRight: "10px", display: "inline-block" }}>
              <input
                type="radio"
                value="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
            <label style={{ marginRight: "10px" }}>
              <input
                type="radio"
                value="prefer-not-to-say"
                checked={gender === "prefer-not-to-say"}
                onChange={(e) => setGender(e.target.value)}
              />
              Prefer not to say
            </label>
          </div>
        </div>
        <div>
          <label>Pronouns:</label>
          <input
            type="text"
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>About Me:</label>
          <input
            type="text"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Hometown:</label>
          <input
            type="text"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Interests:</label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default UserIdentity;
