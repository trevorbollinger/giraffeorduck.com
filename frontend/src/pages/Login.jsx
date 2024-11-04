import LoginForm from "../components/LoginForm";
import "../styles/Login.css";

function Login() {
  return (
    <div>
      <LoginForm route="/game/token/" method="login" />
      <a href="/register">
        <button className="btn btn-link">No Account? Create New Account</button>
      </a>
    </div>
  );
}

export default Login;
