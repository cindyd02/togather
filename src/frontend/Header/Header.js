import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <Link to="/" className="logo-link">
        <h1 className="logo">toGather</h1>
      </Link>
    </header>
  );
};

export default Header;
