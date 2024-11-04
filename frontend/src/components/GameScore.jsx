import React from "react";

function GameScore({ gameScore }) {
    const formattedDate = new Date(gameScore.date).toLocaleDateString("en-US");

    return (
        <div className="gamescore-container" style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", maxWidth: "300px", margin: "10px auto" }}>
            <p className="gamescore-score" style={{ fontSize: "18px", fontWeight: "bold", margin: "5px 0" }}>Score: {gameScore.score}</p>
            <p className="gamescore-streak" style={{ fontSize: "16px", color: "#555", margin: "5px 0" }}>Streak: {gameScore.streak}</p>
            <p className="gamescore-date" style={{ fontSize: "14px", color: "#888", margin: "5px 0" }}>Date: {formattedDate}</p>
        </div>
    );
}

export default GameScore;
