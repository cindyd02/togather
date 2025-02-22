import React from "react";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Let's Explore toGather!</h1>
      <p>
        Finding new people who are new to the city, who don’t know what to do
        or who to go with, and who want to get out of their comfort zone to try
        something new.
      </p>
      <button onClick={() => alert("Login logic goes here")}>Login</button>
      <p>
        Don't have an account? <a href="/sign-in">Sign up</a>
      </p>
    </div>
  );
};

export default Home;
