import { useEffect, useState } from "react";
import api from "../api/api";
import { Event } from "../types";
import EventCard from "../components/EventCard";
import "../styles/events.css";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    api.get<Event[]>("/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="events-container">
      <div className="grid">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}
