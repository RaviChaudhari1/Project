import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="nav-heading">Todo App</h1>
      <div className="nav-routes">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Profile</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
