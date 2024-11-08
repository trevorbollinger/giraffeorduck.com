import React from "react";
import "../styles/GameFinish.css";

function GameFinish({ score, currentIteration }) {
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
        <button onClick={handleShare} className="btn btn-primary">
          Share Results
        </button>
      </div>
    </div>
  );
}

export default GameFinish;
