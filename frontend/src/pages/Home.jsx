import { useState, useEffect } from "react";
import api from "../api";
import GameScore from "../components/GameScore"; // Import GameScore component
import "../styles/Home.css";
import { useAuth } from "../components/AuthContext";

function Home() {
    const [gameScores, setGameScores] = useState([]); // State for game scores
    const [score, setScore] = useState([]); // State for score as an array
    const [streak, setStreak] = useState(""); // State for streak
    const { isAuthorized } = useAuth(); // Get the authorization state
    const [randomImages, setRandomImages] = useState([]); // State for random images
    const [answerKey, setAnswerKey] = useState([]); // State for answer key
    const [currentIteration, setCurrentIteration] = useState(0); // State for current iteration
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);

    useEffect(() => {
        fetchGameData(); // Fetch game data
    }, []);

    const fetchGameData = () => {
        api
            .get("/game/game-data/")
            .then((res) => res.data)
            .then((data) => {
                setRandomImages(data.image_urls); // Update state with array of image URLs
                setAnswerKey(data.answer_key); // Update state with answer key
                setCurrentIteration(data.current_iteration); // Update state with current iteration
            })
            .catch((err) => alert(err));
    };

    const handleGuess = (guess) => {
        const correct = (guess === 'giraffe' && answerKey[currentImageIndex] === 'g') ||
                       (guess === 'duck' && answerKey[currentImageIndex] === 'd');
        
        setScore(prevScore => [...prevScore, correct ? 'y' : 'n']);

        if (currentImageIndex < randomImages.length - 1) {
            setCurrentImageIndex(prevIndex => prevIndex + 1);
        } else {
            setGameComplete(true);
            setStreak(score.filter(s => s === 'y').length);
            if (isAuthorized) {
                createGameScore();
            }
        }
    };

    const resetGame = () => {
        setCurrentImageIndex(0);
        setScore([]);
        setGameComplete(false);
    };

    const createGameScore = () => {
        const scoreData = {
            score: score.filter(s => s === 'y').length,
            streak: 0,
            date: new Date().toISOString().split('T')[0], // Ensure date is included
        };

        api.post("/game/submit-score/", scoreData)
            .then((res) => {
                // alert("Score submitted successfully!");
                setGameScores([...gameScores, res.data]);
            })
            .catch((err) => alert("Failed to submit score: " + err));
    };

    return (
        <div>
            <main>
            {/* <p>#{currentIteration}</p> */}

                {/* Score Display */}
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

                {/* Game Interface */}
                {randomImages.length > 0 && !gameComplete && (
                    <div className='game-interface'>
                        <img 
                            src={randomImages[currentImageIndex]} 
                            alt={`Game Image ${currentImageIndex + 1}`} 
                        />
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

                {/* Game Complete Screen */}
                {gameComplete && (
                    <div className='game-complete'>
                        <h2>Game Complete!</h2>
                        <button onClick={resetGame} className='btn btn-primary'>Play Again</button>
                    </div>
                )}

            </main>
        </div>
    );
}

export default Home;
