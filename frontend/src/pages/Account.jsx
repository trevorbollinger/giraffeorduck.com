import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import "../styles/Account.css";

const Account = () => {
    const { user, logout } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put("/game/user/me/", { first_name: firstName, last_name: lastName });
            alert("Profile updated successfully.");
        } catch (error) {
            alert(error.response?.data?.detail || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            setLoading(true);
            try {
                await api.delete("/game/user/me/");
                logout();
                navigate("/register");
            } catch (error) {
                alert(error.response?.data?.detail || "An error occurred.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="account-container">
            <form onSubmit={handleUpdate} className="form-container">
                <h1>Account Settings</h1>
                
                <div className="input-group">
                    <input
                        className="form-input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        className="form-input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        required
                    />
                </div>

                {loading ? (
                    <LoadingIndicator />
                ) : (
                    <>
                        <button type="submit" className="btn btn-primary">
                            Update Profile
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            Delete Account
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default Account;
