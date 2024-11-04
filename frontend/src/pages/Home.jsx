import { useState, useEffect } from "react";
import api from "../api";
import GameScore from "../components/GameScore"; // Import GameScore component
import "../styles/Home.css";
import { useAuth } from "../components/AuthContext";

function Home() {
    const [gameScores, setGameScores] = useState([]); // State for game scores
    const [score, setScore] = useState(""); // State for score
    const [streak, setStreak] = useState(""); // State for streak
    const { isAuthorized } = useAuth(); // Get the authorization state
    const [randomImage, setRandomImage] = useState(""); // State for random image

    useEffect(() => {
        getGameScores(); // Fetch game scores
        fetchRandomImage(); // Fetch random image
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
            .post("/game/scores/", { score, streak })
            .then((res) => {
                if (res.status === 201) alert("Game score submitted!");
                else alert("Failed to submit game score.");
                getGameScores();
            })
            .catch((err) => alert(err));
    };

    const fetchRandomImage = () => {
        api
            .get("/game/random-image/")
            .then((res) => res.data)
            .then((data) => {
                setRandomImage(data.image_url);
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            {/* Body Section */}
            <main>
                <div>
                    <h2>Game Scores</h2>
                    {gameScores.map((gameScore) => (
                        <GameScore gameScore={gameScore} key={gameScore.id} />
                    ))}
                </div>

                <h2>Submit Game Score</h2>
                <form onSubmit={createGameScore}>
                    <label htmlFor="score">Score:</label>
                    <br />
                    <input
                        type="number"
                        id="score"
                        name="score"
                        required
                        onChange={(e) => setScore(e.target.value)}
                        value={score}
                    />
                    <br />
                    <label htmlFor="streak">Streak:</label>
                    <br />
                    <input
                        type="number"
                        id="streak"
                        name="streak"
                        required
                        onChange={(e) => setStreak(e.target.value)}
                        value={streak}
                    />
                    <br />
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </form>

                {/* Placeholder for Image */}
                <div className='imageContainer'>
                    <img src={randomImage} alt="Game Image" />
                </div>
            </main>
        </div>
    );
}

export default Home;
