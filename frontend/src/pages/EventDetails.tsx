import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { Event } from "../types";
import "../styles/details.css";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [qty, setQty] = useState<number | "">(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get<Event>(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  const book = async () => {
    // ensure qty is a valid number between 1 and 5
    const quantity = Number(qty) || 1;
    if (quantity < 1 || quantity > 5) {
      setMessage("Select a quantity between 1 and 5");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      await api.post(`/bookings?eventId=${id}&quantity=${quantity}`);
      setMessage("Booking successful!");
      setQty(1);
    } catch (e: any) {
      setMessage(e.response?.data?.error || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return null;

  return (
    <div className="details-container">
      <div className="details">
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        {message && <p style={{ color: message.includes("successful") ? "var(--success)" : "var(--danger)" }}>{message}</p>}
        <input
          type="number"
          value={qty}
          min={1}
          max={5}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              // allow clearing the field so user can backspace fully
              setQty("");
              return;
            }

            const v = Number(raw);
            if (isNaN(v)) return;
            if (v > 5) {
              // immediate feedback: alert and inline message
              window.alert("Select maximum 5 tickets");
              setMessage("Select maximum 5 tickets");
              setQty(5);
              return;
            }

            const clamped = Math.max(1, Math.min(5, v));
            setQty(clamped);
            // clear previous messages when input becomes valid
            if (message && !message.includes("successful")) {
              setMessage("");
            }
          }}
          placeholder="Quantity (max 5)"
          disabled={loading}
        />
        <div style={{ fontSize: "0.85rem", color: "var(--gray)", marginTop: "0.5rem" }}>
          Maximum 5 tickets per booking.
        </div>
        <button onClick={book} disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>
      </div>
    </div>
  );
}
