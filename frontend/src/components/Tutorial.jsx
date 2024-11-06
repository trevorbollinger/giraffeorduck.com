import React from 'react';
import '../styles/Tutorial.css';

function Tutorial({ onClose }) {
    return (
        <div className="tutorial-overlay">
            <div className="tutorial-content">
                <h2>How to Play</h2>
                <div className="tutorial-steps">
                    <p>1. You will be shown a series of 5 images</p>
                    <p>2. For each image, guess whether it's a giraffe or a duck</p>
                    <p>3. Each correct guess will turn green, wrong guesses will turn red</p>
                    <p>4. Try to get the highest score possible!</p>
                </div>
                <button className="tutorial-btn" onClick={onClose}>Got it!</button>
            </div>
        </div>
    );
}

export default Tutorial;
