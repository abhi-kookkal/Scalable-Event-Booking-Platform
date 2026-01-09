import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    // Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post<string>("/auth/login", { email, password });
      localStorage.setItem("token", res.data);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button onClick={login} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={{ textAlign: "center", marginTop: "1rem", color: "#6b7280" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#2563eb", fontWeight: "600" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
