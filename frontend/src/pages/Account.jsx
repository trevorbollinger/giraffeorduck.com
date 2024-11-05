import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import GameScore from "../components/GameScore"; // Import GameScore component
import "../styles/Account.css"; // Import the new CSS file

const Account = () => {
    const { user, logout } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gameScores, setGameScores] = useState([]); // State for game scores
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
        getGameScores(); // Fetch game scores
    }, [user]);

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

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put("/game/user/me/", { first_name: firstName, last_name: lastName });
            alert("Profile updated successfully.");
        } catch (error) {
            alert(error.response?.data?.detail || "An error occurred.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await api.delete("/game/user/me/");
                logout();
                navigate("/register");
            } catch (error) {
                alert(error.response?.data?.detail || "An error occurred.");
            }
        }
    };

    return (
        <div className="account-container">
            <h1>Manage Account</h1>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                />
                <button type="submit" id="update-profile-button" className="btn btn-primary">Update Profile</button>
                <button onClick={handleDelete} className="btn btn-danger">Delete Account</button>
            </form>

            {/* Previous Scores Section */}
            <div className='previous-scores'>
                {gameScores.map((gameScore) => (
                    <GameScore gameScore={gameScore} key={gameScore.id} />
                ))}
            </div>
        </div>
    );
};

export default Account;
