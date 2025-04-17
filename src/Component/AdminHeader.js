import React from "react";
import { Link } from "react-router-dom";
import "./AdminHeader.css";

function AdminHeader({ userType }) {
  if (userType !== "admin") {
    return null;
  }

  return (
    <header className="admin-header">
      <div className="header-container">
        {/* <img
          src="https://www.seeree.in/homepage1/img/logo-seeree.png"
          alt="Seeree Logo"
          className="profile-pic"
        /> */}
        <img src="college.jpg"alt="college.jpg"className="profile-pic" style={{ marginTop:"43px", width: "100px", height: "100px" }}/><br />
        <h1>Welcome, Admin!</h1>
        <div className="logout-link">
          <Link to={"/logout"}>Logout</Link>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
