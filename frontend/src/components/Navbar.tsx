import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/main.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h2>EventConnect</h2>
      
      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <div className={`navbar-menu ${mobileMenuOpen ? "active" : ""}`}>
        {isLoggedIn ? (
          <>
            <Link to="/" onClick={closeMobileMenu}>Events</Link>
            <Link to="/bookings" onClick={closeMobileMenu}>Bookings</Link>
            <Link to="/analytics" onClick={closeMobileMenu}>Analytics</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMobileMenu}>Login</Link>
            <Link to="/register" onClick={closeMobileMenu}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
