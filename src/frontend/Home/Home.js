import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="typewriter">
        <span>Let's Explore toGather!</span>
      </h1>
      <p>
        New to the city? Join us to find events near you and connect with others who want to explore too!
      </p>
      <button onClick={() => alert("Login logic goes here")}>Login</button>
      <p2>
        Don't have an account? <a href="/sign-in">Sign up</a>
      </p2>
    </div>
  );
};

export default Home;
