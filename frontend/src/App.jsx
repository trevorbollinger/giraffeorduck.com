import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { useAuth } from "./components/AuthContext";
import Account from "./pages/Account";
import History from "./pages/History";
function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/" replace />;
}

function App() {
  const [isSplashActive, setIsSplashActive] = useState(false); // Changed default to false
  const [isHomePage, setIsHomePage] = useState(false);

  const handleRouteChange = (path) => {
    setIsHomePage(path === "/");
    if (path !== "/") {
      setIsSplashActive(false); // Ensure splash is inactive on non-home pages
    }
  };

  useEffect(() => {
    // Set initial route
    handleRouteChange(window.location.pathname);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout isSplashActive={isSplashActive} isHomePage={isHomePage}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onSplashStateChange={setIsSplashActive}
                  onMount={() => handleRouteChange("/")}
                />
              }
            />
            <Route
              path="/login"
              element={<Login onMount={() => handleRouteChange("/login")} />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
