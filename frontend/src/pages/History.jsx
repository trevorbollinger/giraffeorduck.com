import React, { useState, useEffect } from "react";
import api from "../api";
import GameScore from "../components/GameScore";
import "../styles/History.css";

const History = () => {
    const [gameScores, setGameScores] = useState([]);

    useEffect(() => {
        getGameScores();
    }, []);

    const getGameScores = () => {
        api
            .get("/game/scores/")
            .then((res) => res.data)
            .then((data) => {
                setGameScores(data);
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="history-container">
            <h1>Past Games</h1>
            <div className='scores-list'>
                {gameScores.map((gameScore, index) => (
                    <GameScore gameScore={gameScore} key={gameScore.id} iteration={index + 1} />
                ))}
            </div>
        </div>
    );
};

export default History;
