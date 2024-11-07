import React, { useState } from 'react';
import '../styles/GameFinish.css';

function GameFinish({ score }) {
    const [buttonText, setButtonText] = useState('Share Score');

    const getScoreEmojis = () => {
        return score.map(result => 
            result === 'y' ? '🟩' : result === 'n' ? '🟥' : '⬜'
        ).join('');
    };

    const handleShare = async () => {
        const shareText = `Giraffe or Duck?\n${getScoreEmojis()}\nPlay at giraffeorduck.com`;

        // Check if Web Share API is supported
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Giraffe or Duck?',
                    text: shareText,
                    url: 'https://giraffeorduck.com'
                });
                setButtonText('Shared!');
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        } else {
            // Fall back to clipboard
            try {
                await navigator.clipboard.writeText(shareText);
                setButtonText('Copied!');
                setTimeout(() => setButtonText('Share Score'), 2000);
            } catch (err) {
                console.error('Failed to copy text:', err);
            }
        }
    };

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
            <button onClick={handleShare} className='btn btn-primary'>
                {buttonText}
            </button>
        </div>
    );
}

export default GameFinish;
