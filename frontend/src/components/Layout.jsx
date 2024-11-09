import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Layout.css";
import { useAuth } from "./AuthContext";
import favicon from "../assets/favicon.png";
import Login from "../pages/Login";

const Layout = ({ children, isSplashActive, isHomePage }) => {
  const { isAuthorized, username, firstName, lastName, isStaff, isSuperuser } =
    useAuth();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!isSplashActive && isHomePage) {
      setShouldAnimate(true);
    }

    // Set the CSS variable for the viewport height
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, [isSplashActive, isHomePage]);

  const AuthButtons = ({ isFooter = false }) =>
    isFooter ? (
      // Regular buttons for footer
      <>
        {!(isStaff || isSuperuser) && (
          <a href="/">
            <button className="nav-btn nav-btn-primary">Home</button>
          </a>
        )}

        {isAuthorized ? (
          <>
            <a href="/history">
              <button className="nav-btn nav-btn-primary">Past Games</button>
            </a>
            <a href="/account">
              <button
                id="manage-account-button"
                className="nav-btn nav-btn-primary"
              >
                Account
              </button>
            </a>
            {(isStaff || isSuperuser) && (
              <a
                href="https://gordapi.boli.dev/admin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="nav-btn nav-btn-danger">Admin</button>
              </a>
            )}
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
      // Navbar dropdown changes
      <div className="dropdown-container">
        {!isAuthorized && (
          <>
            <button className="nav-btn nav-btn-primary dropdown-trigger">
              Login
            </button>
            <div className="dropdown-content login-dropdown">
              <Login />
            </div>
          </>
        )}
        {isAuthorized && (
          <>
            <button className="nav-btn nav-btn-primary dropdown-trigger">
              {username}
            </button>
            <div className="dropdown-content">
              <a href="/">
                <button className="nav-btn nav-btn-primary">Home</button>
              </a>
              <a href="/history">
                <button className="nav-btn nav-btn-primary">Past Games</button>
              </a>
              <a href="/account">
                <button
                  id="manage-account-button"
                  className="nav-btn nav-btn-primary"
                >
                  Account
                </button>
              </a>
              {(isStaff || isSuperuser) && (
                <a
                  href="https://gordapi.boli.dev/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="nav-btn nav-btn-danger">Admin</button>
                </a>
              )}
              <a href="/logout">
                <button className="nav-btn nav-btn-danger">Logout</button>
              </a>
            </div>
          </>
        )}
      </div>
    );

  const getAdminLabel = () => {
    if (isSuperuser && isStaff) return " [ADMIN]";
    let label = "";
    if (isSuperuser) label += " [Superuser]";
    if (isStaff) label += " [Staff]";
    return label;
  };

  const showLogo = !(isHomePage && isSplashActive);
  const currentPath = window.location.pathname;
  const isOnHomePage = currentPath === "/";

  const handleLogoClick = (e) => {
    if (isOnHomePage) {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <div
      className={`layout-container ${isSplashActive ? "splash-active" : ""}`}
    >
      <div className="floating-auth">
        <AuthButtons isFooter={false} />
      </div>

      {/* Only show navbar when splash is NOT active */}
      {!isSplashActive && (
        <div className="nav-wrap">
          <nav className={`navbar ${shouldAnimate ? "expanded" : ""}`}>
            <div className="nav-left"></div>
            <div className={`nav-center ${shouldAnimate ? "animate-in" : ""}`}>
              <Link to="/" onClick={handleLogoClick}>
                <img src={favicon} className="faviconlogo" alt="Logo" />
                <span className="logo-text">GIRAFFE OR DUCK?</span>
              </Link>
            </div>
            <div className="nav-right"></div>
          </nav>
        </div>
      )}
      <main className="main-content">{children}</main>
      <footer className="footer">
        {isAuthorized && (
          <p className="footer-greeting">
            Hello, {firstName} ({username}
            {(isStaff || isSuperuser) && "*"}
            )!
          </p>
        )}
        <div className="footer-buttons">
          <AuthButtons isFooter={true} />
        </div>
        {/* <p>© {new Date().getFullYear()} Trevor Bollinger. All rights reserved.</p> */}
      </footer>
    </div>
  );
};

export default Layout;
