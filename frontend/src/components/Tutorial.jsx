import React, { useState, useCallback } from 'react';
import '../styles/Tutorial.css';

function Tutorial({ onClose }) {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(onClose, 300); // Match this with animation duration
    }, [onClose]);

    return (
        <div className={`tutorial-overlay ${isClosing ? 'closing' : ''}`}>
            <div className={`tutorial-content ${isClosing ? 'closing' : ''}`}>
                <h2 className="tutorial-title">Giraffe or Duck? - How to Play</h2>
                <div className="tutorial-steps">
                    <p>In this game, you will be presented with an image of either a giraffe or a duck. Your challenge is to
                        guess which animal is in the picture.</p>
                    <p>Here's how it works:</p>
                    <ol>
                        <li>Look at the image carefully.</li>
                        <li>Decide whether the animal in the picture is a giraffe or a duck.</li>
                        <li>Click on the corresponding button below the image to make your choice.</li>
                        <li>After each round, the scoreboard will be updated with a green square if your guess was correct or a
                            red square if it was incorrect.</li>
                        <li>After all five rounds, you can share your final score.</li>
                        <li>Log in before you play to save your score and start a streak!</li>
                    </ol>
                    <p>Have fun playing, and be sure to come back tomorrow for a new set of images!</p>
                </div>
                <button className="tutorial-btn" onClick={handleClose}>Got it!</button>
            </div>
        </div>
    );
}

export default Tutorial;
