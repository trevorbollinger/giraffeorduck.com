import React from 'react';
import '../styles/GameFinish.css';

function GameFinish({ score, resetGame }) {
    return (
        <div className='game-complete'>
            <h2>Game Complete!</h2>
            <div className="score-display">
                <div className="score-squares">
                    {score.map((result, index) => (
                        <div 
                            key={index} 
                            className={`score-square ${result === 'y' ? 'green' : result === 'n' ? 'red' : 'grey'}`}
                        />
                    ))}
                </div>
            </div>
            <button onClick={resetGame} className='btn btn-primary'>Play Again</button>
        </div>
    );
}

export default GameFinish;
