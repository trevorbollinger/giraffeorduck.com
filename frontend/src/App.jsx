// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; // Import the AuthProvider
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { useAuth } from "./components/AuthContext";
import Account from "./pages/Account"; // Import the Account component

// function Logout() {
//     localStorage.clear();
//     return <Navigate to="/login" />;
// }

function Logout() {
    const { logout } = useAuth();

    useEffect(() => {
        logout(); // Update state and clear session
    }, [logout]);

    return <Navigate to="/login" replace />; // Redirect to login page
}

function RegisterAndLogout() {
  const { logout } = useAuth();

  useEffect(() => {
      logout(); // Update state and clear session
  }, [logout]);
    return <Register />;
}

function App() {
    return (
        <AuthProvider> {/* Wrap your app in AuthProvider */}
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/register" element={<RegisterAndLogout />} />
                        <Route path="/account" element={
                            <ProtectedRoute>
                                <Account />
                            </ProtectedRoute>
                        } />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
