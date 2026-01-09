import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/main.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>EventConnect</h2>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/">Events</Link>
            <Link to="/bookings">Bookings</Link>
            <Link to="/analytics">Analytics</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
