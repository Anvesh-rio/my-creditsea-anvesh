import React from "react";
import "./Header.css";
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const userName = localStorage.getItem("userName");
    const navigate = useNavigate();
  
  return (
    <header className="header">
      <div className="logo">CREDIT APP</div>
      <nav className="nav-links">
        <a href="#" className="hometinnnnn">Home</a>
        <a href="#">Payments</a>
        <a href="#">Budget</a>
        <a href="#">Card</a>
      </nav>
      <div className="user-section">
        <span className="notification-icon">🔔</span>
        <span className="user-icon">{userName}</span>
      <button className="tab active" onClick={() => {
        console.log("Before clear:", localStorage.getItem("userName"));
                console.log("Before clear:", localStorage.getItem("userId"));

        localStorage.clear();
        console.log("After clear:", localStorage.getItem("userName"));
                console.log("After clear:", localStorage.getItem("userId"));

        navigate("/");
      }}>
        Logout
      </button>

      </div>
    </header>
  );
}
