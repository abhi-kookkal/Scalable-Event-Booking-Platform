import { useEffect, useState } from "react";
import api from "../api/api";
import { TopEvent } from "../types";
import "../styles/analytics.css";

export default function Analytics() {
  const [data, setData] = useState<TopEvent[]>([]);

  useEffect(() => {
    api.get<TopEvent[]>("/analytics/top-events").then((res) => setData(res.data));
  }, []);

  return (
    <div className="analytics-container">
      <div className="analytics">
        <h2>Top Booked Events</h2>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Bookings</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>{e.totalBookings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
