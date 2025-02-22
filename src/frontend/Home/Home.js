import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";


const Home = () => {
    const navigate = useNavigate();
  
    const handleLogin = () => {
      navigate('/sign-in');
    };
  
    return (
      <div className="home-container">
        <h1 className="typewriter">
          <span>Let's Explore toGather!</span>
        </h1>
        <p>
          New to the city? Join us to find events near you and connect with others who want to explore too!
        </p>
        <button onClick={handleLogin}>Login</button>
        <p2>
          Don't have an account? <Link to="/sign-in">Sign up</Link>
        </p2>
      </div>
    );
  };
  

export default Home;
