import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // Import the useAuth hook
import "../styles/Form.css";
import LoadingIndicator from "../components/LoadingIndicator";

function Register() {
  const { login } = useAuth(); // Get the login function from AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Add state for confirm password
  const [first_name, setFName] = useState("");
  const [last_name, setLName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) { // Check if passwords match
      alert("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/game/user/register/", { username, password, first_name, last_name });
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Register</h1>

        <input
          className="form-input"
          type="text"
          value={first_name}
          onChange={(e) => setFName(e.target.value)}
          placeholder="First Name"
          required
        />

        <input
          className="form-input"
          type="text"
          value={last_name}
          onChange={(e) => setLName(e.target.value)}
          placeholder="Last Name"
          required
        />

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
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />

        {loading && <LoadingIndicator />}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          Register
        </button>
      </form>
      <a href="/login">
        <button className="btn btn-link">Already have an account? Sign in here.</button>
      </a>
    </div>
  );
}

export default Register;
