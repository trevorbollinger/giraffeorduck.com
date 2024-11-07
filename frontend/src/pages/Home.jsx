import { useState, useEffect } from "react";
import api from "../api";
import GameScore from "../components/GameScore";
import Tutorial from '../components/Tutorial';
import SplashScreen from '../components/SplashScreen';
import Game from '../components/Game';  // Add this import
import "../styles/Home.css";
import { useAuth } from "../components/AuthContext";

function Home({ onSplashStateChange, onMount }) {
    const [gameScores, setGameScores] = useState([]); // State for game scores
    const [score, setScore] = useState([]); // State for score as an array
    const [streak, setStreak] = useState(""); // State for streak
    const { isAuthorized } = useAuth(); // Get the authorization state
    const [randomImages, setRandomImages] = useState([]); // State for random images
    const [answerKey, setAnswerKey] = useState([]); // State for answer key
    const [currentIteration, setCurrentIteration] = useState(0); // State for current iteration
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    const [prevImageIndex, setPrevImageIndex] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [showTutorial, setShowTutorial] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        onMount();
        fetchGameData();
        const formattedDateTime = new Date().toLocaleString("en-US", { 
            timeZone: "America/Chicago"
        });
        setCurrentDate(formattedDateTime);

        const setVh = () => {
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        };
        setVh();
        window.addEventListener('resize', setVh);
        return () => window.removeEventListener('resize', setVh);
    }, [onMount]);

    useEffect(() => {
        onSplashStateChange(!gameStarted);
    }, [gameStarted, onSplashStateChange]);

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
            setPrevImageIndex(currentImageIndex);
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
            date: currentDate,
            iteration: currentIteration,
        };

        api.post("/game/submit-score/", scoreData)
            .then((res) => {
                setGameScores([...gameScores.filter(gs => gs.date !== currentDate), res.data]);
            })
            .catch((err) => alert("Failed to submit score: " + err));
    };

    return (
        <main>
            {!gameStarted ? (
                <SplashScreen 
                    onTutorialClick={() => setShowTutorial(true)}
                    onPlayClick={() => setGameStarted(true)}
                    currentIteration={currentIteration}
                />
            ) : (
                <Game 
                    currentDate={currentDate}
                    randomImages={randomImages}
                    score={score}
                    currentImageIndex={currentImageIndex}
                    prevImageIndex={prevImageIndex}
                    gameComplete={gameComplete}
                    handleGuess={handleGuess}
                    resetGame={resetGame}
                    setPrevImageIndex={setPrevImageIndex}
                    currentIteration={currentIteration}
                />
            )}

            {showTutorial && (
                <Tutorial onClose={() => setShowTutorial(false)} />
            )}
        </main>
    );
}

export default Home;
