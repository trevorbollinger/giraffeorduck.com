import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import LoadingIndicator from "../components/LoadingIndicator";
import "../styles/Register.css";

function Register() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFName] = useState("");
  const [last_name, setLName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/game/user/register/", { username, password, first_name, last_name });
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "An error occurred. (username already taken?)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Create Account</h1>

        <div className="input-group">
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            autoComplete="username"
          />
        </div>
        
        <div className="input-group">
          <input
            className="form-input"
            type="text"
            value={first_name}
            onChange={(e) => setFName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>

        <div className="input-group">
          <input
            className="form-input"
            type="text"
            value={last_name}
            onChange={(e) => setLName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>

        <div className="input-group">
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoComplete="new-password"
          />
        </div>

        <div className="input-group">
          <input
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            autoComplete="new-password"
          />
        </div>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <button className="btn btn-primary" type="submit">
            Create Account
          </button>
        )}
      </form>
      {/* <a href="/login">
        <button className="btn btn-link">
          Already have an account? Sign in here
        </button>
      </a> */}
    </div>
  );
}

export default Register;
