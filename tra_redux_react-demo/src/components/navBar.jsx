import React, { Component } from "react";
import {Link, NavLink} from 'react-router-dom';

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/customer' className="nav-link">
                Customer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/item" className="nav-link">
                Item
              </NavLink>
            </li>           
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
