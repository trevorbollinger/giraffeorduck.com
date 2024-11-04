import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // Import the useAuth hook
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "../components/LoadingIndicator";
import "../styles/Login.css";

function Login() {
  const { login } = useAuth(); // Get the login function from AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/game/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      // Fetch user details to get the first and last name
      const userRes = await api.get("/game/user/me/");
      const { first_name, last_name } = userRes.data;

      login(username, first_name, last_name); // Update isAuthorized on successful login
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.detail || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Login</h1>

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

        {loading && <LoadingIndicator />}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          Login
        </button>
      </form>
      <a href="/register" className="register-link">
        <button className="btn btn-link">Don't have an account? Register here</button>
      </a>
    </div>
  );
}

export default Login;
