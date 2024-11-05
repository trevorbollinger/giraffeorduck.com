import React from "react";
import "../styles/GameScore.css"; // Import the CSS file

function GameScore({ gameScore }) {
    const formattedDate = new Date(gameScore.date).toLocaleDateString("en-US");

    return (
        <div className="gamescore-container">
            <p className="gamescore-date">{formattedDate}</p>
            <p className="gamescore-score">Score: {gameScore.score}</p>
            <p className="gamescore-streak">Streak: {gameScore.streak}</p>
        </div>
    );
}

export default GameScore;
