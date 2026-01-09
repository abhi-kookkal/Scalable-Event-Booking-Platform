# Event Connect 🎟️  
### Scalable Event Booking Platform (Full-Stack)

Event Connect is a simplified, scalable event booking system inspired by platforms like BookMyShow.  
It allows users to browse events, book tickets securely, and view booking analytics.

This project demonstrates **frontend UI skills**, **backend API design**, **database modeling**, **security**, and **scalability considerations**.

---

## ✨ Features

### User Features
- Browse available events
- View event details
- Book tickets (authenticated users only)
- Rate-limited bookings (5 per user per minute)

### Admin / Analytics
- View top 3 most booked events
- Booking statistics via optimized SQL aggregation

---

## 🧱 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security (JWT authentication)
- Spring Data JPA (Hibernate)
- PostgreSQL
- Bucket4j (rate limiting)

### Frontend
- React + TypeScript (Vite)
- Axios
- React Router
- Plain CSS (no UI frameworks)

---

## 🔐 Security

- JWT-based authentication
- Access token expiry: **15 minutes**
- Stateless backend
- Protected booking APIs
- Rate limiting: **max 5 bookings / user / minute**

---

## 🗂️ Database Design

### Tables
- `users`
- `events`
- `bookings`

### Relationships
- One user → many bookings
- One event → many bookings

### Indexing
- Indexed `user_id`, `event_id`, `booked_at` for performance

---

## 📊 SQL Requirement (Top 3 Most Booked Events)

```sql
SELECT 
    e.id,
    e.title,
    SUM(b.quantity) AS total_bookings
FROM bookings b
JOIN events e ON b.event_id = e.id
GROUP BY e.id, e.title
ORDER BY total_bookings DESC
LIMIT 3;
