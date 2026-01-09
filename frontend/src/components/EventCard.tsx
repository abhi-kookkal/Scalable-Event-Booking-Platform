import { Event } from "../types";
import { Link } from "react-router-dom";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <p>{event.venue}</p>
      <Link to={`/events/${event.id}`}>View Details</Link>
    </div>
  );
}
