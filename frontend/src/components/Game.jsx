import React from 'react';
import '../styles/Game.css';

function Game({ 
    currentDate,
    randomImages,
    score,
    currentImageIndex,
    prevImageIndex,
    gameComplete,
    handleGuess,
    resetGame,
    setPrevImageIndex 
}) {
    return (
        <>
            {randomImages.length > 0 && !gameComplete && (
                <div className='game-interface'>
                    <div className="score-display">
                        <div className="score-squares">
                            {[0, 1, 2, 3, 4].map((index) => (
                                <div 
                                    key={index} 
                                    className={`score-square ${score[index] === 'y' ? 'green' : score[index] === 'n' ? 'red' : 'grey'}`}
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
                                className="slide-exit"
                                onAnimationEnd={() => setPrevImageIndex(null)}
                            />
                        )}
                        <img 
                            key={`current-${currentImageIndex}`}
                            src={randomImages[currentImageIndex]}
                            alt={`Game Image ${currentImageIndex + 1}`}
                            className={prevImageIndex === null ? '' : 'slide-enter'}
                        />
                    </div>
                    <div className='button-container'>
                        <button 
                            onClick={() => handleGuess('giraffe')}
                            className='game-btn game-btn-primary'
                        >
                            Giraffe
                        </button>
                        <button 
                            onClick={() => handleGuess('duck')}
                            className='game-btn game-btn-secondary'
                        >
                            Duck
                        </button>
                    </div>
                </div>
            )}

            {gameComplete && (
                <div className='game-complete'>
                    <h2>Game Complete!</h2>
                    <button onClick={resetGame} className='btn btn-primary'>Play Again</button>
                </div>
            )}
        </>
    );
}

export default Game;
