import React from 'react';
import favicon from "../assets/favicon.png";
import '../styles/SplashScreen.css';

function SplashScreen({ onTutorialClick, onPlayClick, currentIteration }) {
    const currentDate = new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });

    return (
        <div className="splash-screen">
            <img src={favicon} className="splash-logo" alt="Game Logo" />
            <h1 className='splash-text-logo'>GIRAFFE OR DUCK?</h1>
            <div className="splash-buttons">
                <button onClick={onTutorialClick}>How to Play</button>
                <button onClick={onPlayClick}>Start</button>
            </div>
            <p className="date-text">{currentDate}</p>
            <p className="iteration-text">#{currentIteration}</p>
        </div>
    );
}

export default SplashScreen;
