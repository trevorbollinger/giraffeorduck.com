// Form.jsx
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const { login } = useAuth(); // Get the login function from AuthContext
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            await api.post(route, { username, password, first_name });
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.detail || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Register</h1>

            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />

            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />

            <input
                className="form-input"
                type="text"
                value={first_name}
                onChange={(e) => setFName(e.target.value)}
                placeholder="First Name"
            />



            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit" disabled={loading}>
              Register
            </button>
        </form>
    );
}

export default Form;
