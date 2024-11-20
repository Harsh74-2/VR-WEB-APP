// components/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/upload">Upload File</Link></li>
          {user ? (
            <>
              <li><Link to="/submit">Submit Tour</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;