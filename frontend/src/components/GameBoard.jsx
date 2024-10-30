// src/components/GameBoard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const GameBoard = ({ hardMode }) => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [results, setResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Fetch 5 random images from the backend
    axios
      .get("/api/images")
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const handleGuess = (guess) => {
    const isCorrect = images[currentImage].label === guess;
    setResults([...results, isCorrect]);

    if (currentImage === images.length - 1) {
      setGameOver(true); // End the game after the last image
    } else {
      setCurrentImage(currentImage + 1); // Move to the next image
    }
  };

  if (gameOver) {
    return (
      <div>
        <h2>Thanks for Playing!</h2>
        <p>
          Your Results: {results.filter(Boolean).length} / {images.length}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Is this a Giraffe or a Duck?</h2>
      {hardMode && <p>(Hard mode is ON - images are blurred)</p>}
      <img
        src={images[currentImage]?.url}
        alt="Guess the animal"
        style={{ filter: hardMode ? "blur(5px)" : "none" }}
      />
      <div>
        <button onClick={() => handleGuess("giraffe")}>Giraffe</button>
        <button onClick={() => handleGuess("duck")}>Duck</button>
      </div>
    </div>
  );
};

export default GameBoard;
