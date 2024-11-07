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
            <div className="gamescore-squares">
                {gameScore.score.map((result, index) => (
                    <div 
                        key={index}
                        className={`score-square ${result === 'y' ? 'green' : 'red'}`}
                    />
                ))}
            </div>
            <p className="gamescore-streak">Streak: {gameScore.streak}</p>
            <p className="gamescore-iteration">Day: {gameScore.iteration}</p>
        </div>
    );
}

export default GameScore;
