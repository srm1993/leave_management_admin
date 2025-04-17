import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import AdminHeader from "./Component/AdminHeader";
import AdminHome from "./Component/AdminHome";
import ApproveUser from "./Component/ApproveUser";
import Logout from "./Component/Logout";
import SideOptions from "./Component/SideOptions";
import ApplyLeave from "./Component/ApplyLeave";

function App() {
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const handleLogin = (role) => {
    setUserType(role); 
    localStorage.setItem("userType", role); 
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header at the top */}
      {userType === "admin" && !isLoginPage && <AdminHeader userType={userType} />}
  
      {/* Main content with sidebar and page content */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar on the left */}
        {userType === "admin" && !isLoginPage && (
          <div style={{ width: "250px", flexShrink: 0 }}>
            <SideOptions userType={userType} />
          </div>
        )}
  
        {/* Main content area */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/adminhome" element={<AdminHome />} />
            <Route path="/approveuser" element={<ApproveUser />} />
            <Route path="/fetchLeave" element={<ApplyLeave />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </div>
  );
    
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
