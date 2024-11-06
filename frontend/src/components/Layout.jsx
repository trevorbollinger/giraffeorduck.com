import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Layout.css";
import { useAuth } from "./AuthContext";
import favicon from "../assets/favicon.png";

const Layout = ({ children, isSplashActive, isHomePage }) => {
  const { isAuthorized, username, firstName, lastName } = useAuth();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!isSplashActive && isHomePage) {
      // Start animation when splash screen is removed
      setShouldAnimate(true);
    }
  }, [isSplashActive, isHomePage]);

  const AuthButtons = () => (
    isAuthorized ? (
      <>
        <a href="/history">
          <button className="nav-btn nav-btn-primary">History</button>
        </a>
        <a href="/account">
          <button id="manage-account-button" className="nav-btn nav-btn-primary">Account</button>
        </a>
        <a href="/logout">
          <button className="nav-btn nav-btn-danger">Logout</button>
        </a>
      </>
    ) : (
      <>
        <a href="/login">
          <button className="nav-btn nav-btn-primary">Login</button>
        </a>
        <a href="/register">
          <button className="nav-btn nav-btn-primary">Register</button>
        </a>
      </>
    )
  );

  return (
    <div className={`layout-container ${isHomePage && isSplashActive ? 'splash-active' : ''}`}>
      <div className="nav-wrap">
        <nav className={`navbar ${!isSplashActive && shouldAnimate ? 'expanded' : ''}`}>
          <div className="nav-left">
            {isAuthorized ? (
              <p className="greeting">Hello, {firstName} {lastName} ({username})!</p>
            ) : (
              <p className="greeting">You are logged out.</p>
            )}
          </div>
          <div className={`nav-center ${!isSplashActive && shouldAnimate ? 'animate-in' : ''}`}>
            <Link to="/">
              <img src={favicon} className="faviconlogo" alt="Logo" />
              <span className="logo-text">GIRAFFE OR DUCK?</span>
            </Link>
          </div>
          <div className="nav-right">
            <AuthButtons />
          </div>
        </nav>
      </div>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <div className="footer-buttons">
          <AuthButtons />
        </div>
        <p>© {new Date().getFullYear()} Trevor Bollinger. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
