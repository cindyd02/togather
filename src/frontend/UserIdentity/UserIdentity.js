import React, { useState } from "react";

const UserIdentity = () => {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [hometown, setHometown] = useState("");
  const [interests, setInterests] = useState([]);

  const handleInterestChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setInterests(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
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
          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
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
          <label>Hometown:</label>
          <input
            type="text"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Interests:</label>
          <select
            multiple
            value={interests}
            onChange={handleInterestChange}
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
          >
            <option value="coding">Coding</option>
            <option value="music">Music</option>
            <option value="traveling">Traveling</option>
            <option value="sports">Sports</option>
            <option value="reading">Reading</option>
            <option value="art">Art</option>
            <option value="cooking">Cooking</option>
            <option value="photography">Photography</option>
          </select>
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default UserIdentity;
