import React from "react";
import { Link } from "react-router-dom";
import "../styles/GameFinish.css";

function GameFinish({ score, currentIteration, isAuthorized }) {
  const getScoreEmojis = () => {
    return score.map((result) => (result === "y" ? "✅" : "❌")).join("");
  };

  const handleShare = async () => {
    const shareText = `Giraffe or Duck? #${currentIteration}\n${getScoreEmojis()}`;
    console.log(shareText); // Add debug logging

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
    <div className="game-complete">
      <h2>Thank you for playing!</h2>
      <div className="score-display">
        <div className="score-label">Final Score</div>
        <div className="score-squares">
          {score.map((result, index) => (
            <div
              key={index}
              className={`score-square ${result === "y" ? "green" : "red"}`}
            />
          ))}
        </div>
        <div className="button-group">
          <button onClick={handleShare} className="btn btn-primary">
            Share Results
          </button>
          {isAuthorized && (
            <Link to="/history" className="btn btn-secondary">
              Past Games
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameFinish;
