import React from "react";
import "../styles/Game.css";
import GameFinish from "./GameFinish";

function Game({
  currentDate,
  randomImages,
  score,
  currentImageIndex,
  prevImageIndex,
  gameComplete,
  handleGuess,
  resetGame,
  setPrevImageIndex,
  currentIteration,
  hardMode,
  isAuthorized,
}) {
  return (
    <>
      {randomImages.length > 0 && !gameComplete && (
        <div className="game-interface">
          <div className="score-display">
            <div className="score-squares">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`score-square ${
                    score[index] === "y"
                      ? "green"
                      : score[index] === "n"
                      ? "red"
                      : "grey"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="image-wrapper">
            {prevImageIndex !== null && (
              <img
                key={`prev-${prevImageIndex}`}
                src={randomImages[prevImageIndex]}
                alt={`Previous Game Image`}
                className={`slide-exit ${hardMode ? 'blurred' : ''}`}
                onAnimationEnd={() => setPrevImageIndex(null)}
              />
            )}
            <img
              key={`current-${currentImageIndex}`}
              src={randomImages[currentImageIndex]}
              alt={`Game Image ${currentImageIndex + 1}`}
              className={`${prevImageIndex === null ? "" : "slide-enter"} ${hardMode ? 'blurred' : ''}`}
            />
          </div>
          <div className="button-container">
            <button
              onClick={() => handleGuess("giraffe")}
              className="game-btn-dark"
            >
              Giraffe
            </button>
            <button
              onClick={() => handleGuess("duck")}
              className="game-btn-dark"
            >
              Duck
            </button>
          </div>
        </div>
      )}

      {gameComplete && (
        <GameFinish
          score={score}
          currentIteration={currentIteration}
          resetGame={resetGame}
          isAuthorized={isAuthorized}
        />
      )}
    </>
  );
}

export default Game;
