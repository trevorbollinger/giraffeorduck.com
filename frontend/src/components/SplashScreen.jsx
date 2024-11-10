import React from "react";
import favicon from "../assets/favicon.png";
import "../styles/SplashScreen.css";

function SplashScreen({
  onTutorialClick,
  onPlayClick,
  currentIteration,
  hardMode,
  setHardMode,
  isAuthorized,  // Add this line
}) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="splash-screen">
      <img src={favicon} className="splash-logo" alt="Game Logo" />
      <h1 className="splash-text-logo">GIRAFFE OR DUCK?</h1>
      {!isAuthorized && (
        <p className="auth-message">Make an account or login to save your score and streak!</p>
      )}
      <div className="splash-buttons">
        <button onClick={onTutorialClick}>How to Play</button>
        <button onClick={onPlayClick}>Start</button>
      </div>
      <div className="hard-mode-container">
        <input
          type="checkbox"
          id="hard-mode"
          className="hard-mode-checkbox"
          checked={hardMode}
          onChange={(e) => setHardMode(e.target.checked)}
        />
        <label htmlFor="hard-mode">Hard Mode</label>
      </div>
      <p className="date-text">{currentDate}</p>
      <p className="iteration-text">#{currentIteration}</p>
    </div>
  );
}

export default SplashScreen;
