import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Layout.css";
import { useAuth } from "./AuthContext";
import favicon from "../assets/favicon.png";

const Layout = ({ children, isSplashActive, isHomePage }) => {
  const { isAuthorized, username, firstName, lastName, isStaff, isSuperuser } = useAuth();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!isSplashActive && isHomePage) {
      // Start animation when splash screen is removed
      setShouldAnimate(true);
    }

    // Set the CSS variable for the viewport height
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, [isSplashActive, isHomePage]);

  const AuthButtons = ({ isFooter = false }) => (
    isFooter ? (
      // Regular buttons for footer
      <>
        <a href="/">
          <button className="nav-btn nav-btn-primary">Home</button>
        </a>
        {isAuthorized ? (
          <>
            {(isStaff || isSuperuser) && (
              <a href="https://gordapi.boli.dev/admin" target="_blank" rel="noopener noreferrer">
                <button className="nav-btn nav-btn-primary">Admin</button>
              </a>
            )}
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
        )}
      </>
    ) : (
      // Dropdown menu for navbar remains the same
      <div className="dropdown-container">
        <button className="nav-btn nav-btn-primary dropdown-trigger">Menu</button>
        <div className="dropdown-content">
          {isAuthorized ? (
            <>
              <a href="/">
                <button className="nav-btn nav-btn-primary">Home</button>
              </a>
              <a href="/history">
                <button className="nav-btn nav-btn-primary">History</button>
              </a>
              <a href="/account">
                <button id="manage-account-button" className="nav-btn nav-btn-primary">Account</button>
              </a>
              {(isStaff || isSuperuser) && (
                <a href="https://gordapi.boli.dev/admin" target="_blank" rel="noopener noreferrer">
                  <button className="nav-btn nav-btn-danger">Admin</button>
                </a>
              )}
              <a href="/logout">
                <button className="nav-btn nav-btn-danger">Logout</button>
              </a>
            </>
          ) : (
            <>
              <a href="/">
                <button className="nav-btn nav-btn-primary">Home</button>
              </a>
              <a href="/login">
                <button className="nav-btn nav-btn-primary">Login</button>
              </a>
              <a href="/register">
                <button className="nav-btn nav-btn-primary">Register</button>
              </a>
            </>
          )}
        </div>
      </div>
    )
  );

  const getAdminLabel = () => {
    if (isSuperuser && isStaff) return ' [ADMIN]';
    let label = '';
    if (isSuperuser) label += ' [Superuser]';
    if (isStaff) label += ' [Staff]';
    return label;
  };

  const showLogo = !(isHomePage && isSplashActive);
  const currentPath = window.location.pathname;
  const isOnHomePage = currentPath === '/';

  const handleLogoClick = (e) => {
    if (isOnHomePage) {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <div className={`layout-container ${isHomePage && isSplashActive ? 'splash-active' : ''}`}>
      <div className="nav-wrap">
        <nav className={`navbar ${!isSplashActive && shouldAnimate ? 'expanded' : ''}`}>
          <div className="nav-left">
            {isAuthorized ? (
              <p className="greeting">
                Hello, {firstName} {lastName} ({username}){getAdminLabel()}
              </p>
            ) : (
              <p className="greeting">You are logged out.</p>
            )}
          </div>
          {showLogo && (
            <div className={`nav-center ${!isSplashActive && shouldAnimate ? 'animate-in' : ''}`}>
              <Link to="/" onClick={handleLogoClick}>
                <img src={favicon} className="faviconlogo" alt="Logo" />
                <span className="logo-text">GIRAFFE OR DUCK?</span>
              </Link>
            </div>
          )}
          <div className="nav-right">
            <AuthButtons isFooter={false} />
          </div>
        </nav>
      </div>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <div className="footer-buttons">
          <AuthButtons isFooter={true} />
        </div>
        {/* <p>© {new Date().getFullYear()} Trevor Bollinger. All rights reserved.</p> */}
      </footer>
    </div>
  );
};

export default Layout;
