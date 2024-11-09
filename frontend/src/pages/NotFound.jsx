import { useAuth } from "../components/AuthContext";


function NotFound() {
  const { isAuthorized } = useAuth(); // Get the authorization state


  return <div>
    <h1>404 Not Found</h1>
    <p>Get Lost</p>
  </div>;
}

export default NotFound;
