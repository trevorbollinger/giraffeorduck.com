// src/components/Scoreboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Scoreboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios
      .get("/api/scores")
      .then((response) => setScores(response.data))
      .catch((error) => console.error("Error fetching scores:", error));
  }, []);

  return (
    <div>
      <h2>Your Scores and Streaks</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            Date: {score.date} - Score: {score.value} - Streak: {score.streak}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
