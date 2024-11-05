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
        getGameScores(); // Fetch game scores
        fetchGameData(); // Fetch game data
    }, []);

    const getGameScores = () => {
        api
            .get("/game/scores/")
            .then((res) => res.data)
            .then((data) => {
                setGameScores(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const createGameScore = (e) => {
        e.preventDefault();
        api
            .post("/game/scores/", { score: score.join(''), streak })
            .then((res) => {
                if (res.status === 201) alert("Game score submitted!");
                else alert("Failed to submit game score.");
                getGameScores();
            })
            .catch((err) => alert(err));
    };

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
            // Optionally submit the score here
            setStreak(score.filter(s => s === 'y').length);
        }
    };

    const resetGame = () => {
        setCurrentImageIndex(0);
        setScore([]);
        setGameComplete(false);
    };

    return (
        <div>
            <main>
                {/* Score Display */}
                <div className="score-display">
                    <h3>Current Score: {score.join(', ')}</h3>
                    <p>Game #{currentIteration}</p>
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
                                className='btn btn-primary'
                            >
                                Giraffe
                            </button>
                            <button 
                                onClick={() => handleGuess('duck')}
                                className='btn btn-secondary'
                            >
                                Duck
                            </button>
                        </div>
                        <p>Image {currentImageIndex + 1} of 5</p>
                    </div>
                )}

                {/* Game Complete Screen */}
                {gameComplete && (
                    <div className='game-complete'>
                        <h2>Game Complete!</h2>
                        <p>Final Score: {score.join(', ')}</p>
                        <button onClick={resetGame} className='btn btn-primary'>Play Again</button>
                        <button onClick={createGameScore} className='btn btn-success'>Submit Score</button>
                    </div>
                )}

                {/* Previous Scores Section */}
                <div className='previous-scores'>
                    {gameScores.map((gameScore) => (
                        <GameScore gameScore={gameScore} key={gameScore.id} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;
