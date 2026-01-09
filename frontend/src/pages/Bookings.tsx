import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Booking, Event } from "../types";
import "../styles/events.css";

interface BookingWithEvent extends Booking {
  event?: Event;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<BookingWithEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get<BookingWithEvent[]>("/bookings/my")
      .then((res) => setBookings(res.data))
      .catch((err: any) => {
        if (err.response?.status === 401) {
          // session expired / unauthorized — clear token and redirect to login
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError(err.response?.data?.message || "Failed to load bookings");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this booking? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await api.delete(`/bookings/${id}`);
      setBookings((b) => b.filter((x) => x.id !== id));
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      alert(err.response?.data?.message || "Failed to delete booking");
    }
  };

  return (
    <div className="events-container">
      <h2 style={{ marginBottom: "1rem" }}>My Bookings</h2>
      {loading && <p>Loading bookings...</p>}
      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
      {!loading && bookings.length === 0 && <p>No bookings found.</p>}
      <div className="grid">
        {bookings.map((b) => (
          <div className="card" key={b.id}>
            <h3>{b.event?.title || "Event"}</h3>
            <p>Quantity: {b.quantity}</p>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
              <button
                style={{ background: "#ef4444", borderRadius: 8, padding: "0.5rem 0.9rem", color: "white", fontWeight: 700 }}
                onClick={() => handleDelete(b.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
