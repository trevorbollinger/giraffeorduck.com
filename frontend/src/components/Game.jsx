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
  const getScreenResolution = () => {
    const resolution = `${window.screen.width}x${window.screen.height}`;
    console.log('Screen resolution:', resolution);
    return resolution;
  };

  const handleGameComplete = () => {
    setGameComplete(true);
    setStreak(score.filter(s => s === 'y').length);
    
    const finalScore = {
      score: score,
      streak: score.filter(s => s === 'y').length,
      iteration: currentIteration,
      hard_mode: hardMode,
      screenResolution: getScreenResolution(),
    };

    if (isAuthorized) {
      createGameScore(finalScore);
    }
  };

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
              onClick={() => handleGuess("giraffe", getScreenResolution())}
              className="game-btn-dark"
            >
              Giraffe
            </button>
            <button
              onClick={() => handleGuess("duck", getScreenResolution())}
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
