import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/Layout.css"; // Import your CSS file
import { useAuth } from "./AuthContext";
import logo from "../assets/logo.png";
import favicon from "../assets/favicon.png";

const Layout = ({ children }) => {
  const { isAuthorized } = useAuth();
  const { username } = useAuth();

  return (
    <div className="layout-container">
      <div className="nav-wrap">
        <nav className="navbar">
          <div className="nav-left">
            {isAuthorized ? <p>Hello, {username}!</p> : <p>User is logged out</p>}
          </div>
          <div className="nav-center">
            <img src={favicon} className="faviconlogo" alt="Logo" />{" "}
            <img src={logo} className="textlogo" alt="Logo" />{" "}
          </div>
          <div className="nav-right">
            {isAuthorized ? <a href="logout/"><button className="logout-button">Logout</button></a> : <p></p>}

          </div>
        </nav>
      </div>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Trevor Bollinger. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
