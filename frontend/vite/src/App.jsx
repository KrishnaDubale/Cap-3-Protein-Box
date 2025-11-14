import { useState, useEffect } from "react";
import "./index.css";
import Auth from "./components/auth/Auth";
import Dashboard from "./components/dashboard/Dashboard";
import { authAPI, tokenManager } from "./services/api";

export default function App() {
  const [view, setView] = useState("auth"); // auth | dashboard
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (tokenManager.hasToken()) {
        try {
          const user = await authAPI.getProfile();
          setCurrentUser(user);
          setView("dashboard");
        } catch (error) {
          console.error("Auth check failed:", error);
          tokenManager.removeToken();
          setView("auth");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = async () => {
    try {
      const user = await authAPI.getProfile();
      setCurrentUser(user);
      setView("dashboard");
    } catch (error) {
      console.error("Failed to fetch profile after authentication:", error);
      alert("Authentication successful but failed to load profile. Please try again.");
    }
  };

  const handleLogout = () => {
    tokenManager.removeToken();
    setCurrentUser(null);
    setView("auth");
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FED0BB 0%, #FCB9B2 100%)',
      }}>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.5rem',
          color: '#461220',
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      {view === "dashboard" && currentUser ? (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <div className="auth-container">
          <div className="auth-card">
            <Auth onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      )}
    </>
  );
}
