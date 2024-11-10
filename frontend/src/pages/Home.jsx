import { useState, useEffect } from "react";
import api from "../api";
import GameScore from "../components/GameScore";
import Tutorial from '../components/Tutorial';
import SplashScreen from '../components/SplashScreen';
import Game from '../components/Game';
import "../styles/Home.css";
import { useAuth } from "../components/AuthContext";

function Home({ onSplashStateChange, onMount }) {
    const [gameScores, setGameScores] = useState([]); 
    const [score, setScore] = useState([]); 
    const [streak, setStreak] = useState("");
    const { isAuthorized } = useAuth();
    const [randomImages, setRandomImages] = useState([]); 
    const [answerKey, setAnswerKey] = useState([]); 
    const [currentIteration, setCurrentIteration] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    const [prevImageIndex, setPrevImageIndex] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [showTutorial, setShowTutorial] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [hardMode, setHardMode] = useState(false);

    useEffect(() => {
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
    }, []);

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
        
        const newScore = [...score, correct ? 'y' : 'n'];
        setScore(newScore);

        if (currentImageIndex < randomImages.length - 1) {
            setPrevImageIndex(currentImageIndex);
            setCurrentImageIndex(prevIndex => prevIndex + 1);
        } else {
            setGameComplete(true);
            setStreak(newScore.filter(s => s === 'y').length);
            const screenResolution = `${window.screen.width}x${window.screen.height}`;
            createGameScore(newScore, screenResolution);  // Always create score, regardless of auth status
        }
    };

    const resetGame = () => {
        setCurrentImageIndex(0);
        setScore([]);
        setGameComplete(false);
    };

    const createGameScore = (finalScore, screenResolution) => {
        const scoreData = {
            score: finalScore,
            streak: 0,
            date: currentDate,
            iteration: currentIteration,
            hard_mode: hardMode,
            screenResolution: screenResolution
        };

        api.post("/game/submit-score/", scoreData)
            .then((res) => {
                if (isAuthorized) {
                    setGameScores([...gameScores.filter(gs => gs.date !== currentDate), res.data]);
                }
            })
            .catch((err) => console.error("Failed to submit score:", err));
    };

    const handlePlayClick = () => {
        setGameStarted(true);
        onSplashStateChange(false); // Explicitly set splash to false when game starts
    };

    return (
        <main>
            {!gameStarted ? (
                <SplashScreen 
                    onTutorialClick={() => setShowTutorial(true)}
                    onPlayClick={handlePlayClick} // Use the new handler
                    currentIteration={currentIteration}
                    hardMode={hardMode}
                    setHardMode={setHardMode}
                    isAuthorized={isAuthorized}  // Add this line
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
                    hardMode={hardMode}
                    isAuthorized={isAuthorized}
                />
            )}

            {showTutorial && (
                <Tutorial onClose={() => setShowTutorial(false)} />
            )}
        </main>
    );
}

export default Home;
