import React from "react";
import "../styles/GameScore.css";

function GameScore({ gameScore }) {
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        return (
            <>
                <span>{formattedDate}</span>
            </>
        );
    };

    const handleShare = async () => {
        const shareText = `Giraffe or Duck? #${gameScore.iteration}\n${gameScore.score.map(result => result === 'y' ? '✅' : '❌').join('')}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Giraffe or Duck?",
                    text: shareText,
                });
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error sharing:", err);
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareText);
            } catch (err) {
                console.error("Failed to copy text:", err);
            }
        }
    };

    return (
        <div className="gamescore-container">
            <div className="gamescore-info">
                <p className="gamescore-date">{formatDateTime(gameScore.date)}</p>
                <div className="gamescore-stats">
                    <p className="gamescore-iteration">#{gameScore.iteration}</p>
                    <p className="gamescore-hard-mode" title="Hard Mode">
                        Hard Mode: {gameScore.hard_mode ? '✅' : '❌'}
                    </p>
                    <p className="gamescore-streak">
                        🔥{gameScore.streak}
                    </p>
                </div>
                <div className="gamescore-squares">
                    {gameScore.score.map((result, index) => (
                        <div 
                            key={index}
                            className={`history-score-square ${result === 'y' ? 'green' : 'red'}`}
                        />
                    ))}
                </div>
                <button onClick={handleShare} className="share-button">
                    Share
                </button>
            </div>
        </div>
    );
}

export default GameScore;
