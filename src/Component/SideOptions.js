import React from "react";
import { Link } from "react-router-dom";
import './SideOptions.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SideOptions() {
  const userType = localStorage.getItem('userType');

  if (!userType) {
    return <></>;
  }

  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <ul className="sidebar-list">
          <li>
            <Link to="/adminHome" className="sidebar-link">
              <i className="bi bi-house-door"></i>  Home
            </Link>
          </li>
          <li>
            <Link to="/approveUser" className="sidebar-link">
              <i className="bi bi-people-fill"></i>  Employees
            </Link>
          </li>
          <li>
            <Link to="/fetchLeave" className="sidebar-link">
            <i class="bi bi-calendar-x"></i>  Fetch Leave
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideOptions;
