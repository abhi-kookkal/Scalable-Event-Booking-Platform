import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    // Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", { email, password });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registration failed. Please try again."
      );
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      register();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        <input
          placeholder="Email"
          type="email"
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button onClick={register} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p style={{ textAlign: "center", marginTop: "1rem", color: "#6b7280" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2563eb", fontWeight: "600" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
