import React from "react";
import { Link } from "react-router-dom";
import "../styles/Layout.css";
import { useAuth } from "./AuthContext";
import logo from "../assets/logo.png";
import favicon from "../assets/favicon.png";

const Layout = ({ children }) => {
  const { isAuthorized, username, firstName, lastName } = useAuth();

  return (
    <div className="layout-container">
      <div className="nav-wrap">
        <nav className="navbar">
          <div className="nav-left">
            {isAuthorized ? (
              <p className="greeting">Hello, {firstName} {lastName} ({username})!</p>
            ) : (
              <p className="greeting">You are logged out.</p>
            )}
          </div>
          <div className="nav-center">
            <Link to="/">
              <img src={favicon} className="faviconlogo" alt="Logo" />
              <img src={logo} className="textlogo" alt="Logo" />
            </Link>
          </div>
          <div className="nav-right">
            {isAuthorized ? (
              <>
                <a href="/account">
                  <button id="manage-account-button" className="btn btn-primary">Account</button>
                </a>
                <a href="/logout">
                  <button className="btn btn-danger">Logout</button>
                </a>
              </>
            ) : (
              <>
                <a href="/login">
                  <button className="btn btn-primary">Login</button>
                </a>
                <a href="/register">
                  <button className="btn btn-primary">Register</button>
                </a>
              </>
            )}
          </div>
        </nav>
      </div>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Trevor Bollinger. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
