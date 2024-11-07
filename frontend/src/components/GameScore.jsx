import React from "react";
import "../styles/GameScore.css";

function GameScore({ gameScore }) {
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return (
            <>
                <span>{date.toLocaleDateString()}</span>
                <br />
                <span>{date.toLocaleTimeString()}</span>
            </>
        );
    };

    return (
        <div className="gamescore-container">
            <p className="gamescore-date">{formatDateTime(gameScore.date)}</p>
            <p className="gamescore-score">Score: {gameScore.score}</p>
            <p className="gamescore-streak">Streak: {gameScore.streak}</p>
            <p className="gamescore-iteration">Day: {gameScore.iteration}</p>
        </div>
    );
}

export default GameScore;
