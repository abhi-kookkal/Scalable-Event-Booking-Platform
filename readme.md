# Event Connect 🎟️  
### Scalable Event Booking Platform (Full-Stack)

Event Connect is a simplified, scalable event booking system inspired by platforms like BookMyShow.  
It allows users to browse events, book tickets securely, and view booking analytics.

This project demonstrates **frontend UI skills**, **backend API design**, **database modeling**, **security**, and **scalability considerations**.

---

## 🚀 Live Demo

**Frontend (Hosted on Vercel):** https://scalable-event-booking-platform-c82fhjkgm.vercel.app  
**Backend (Hosted on Render):** https://scalable-event-booking-platform.onrender.com  

⚠️ **Note:** The backend may take up to 1 minute to load on the first request due to the free plan cold start.

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
```

---

## �️ Setup & Installation

### Prerequisites
- **Frontend:** Node.js 16+ and npm
- **Backend:** Java 17, Maven, PostgreSQL

### Clone the Repository
```bash
git clone https://github.com/yourusername/Scalable-Event-Booking-Platform.git
cd Scalable-Event-Booking-Platform
```

### Frontend Setup (React + TypeScript)

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup (Spring Boot)

1. Navigate to backend directory:
```bash
cd backend
```

2. Configure PostgreSQL:
   - Create a database named `event_connect`
   - Update `.env` file with your database credentials:
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/event_connect
DATABASE_USERNAME=your_db_user
DATABASE_PASSWORD=your_db_password
```

3. Build the project:
```bash
./mvnw clean build
```

4. Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```

The backend API will be available at `http://localhost:8080`

---

## 📡 API Examples

### Create a New Event
Use this curl command to create a new event:

```bash
curl -X POST https://scalable-event-booking-platform.onrender.com/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Stack Developer Conference",
    "description": "Hands-on sessions covering frontend, backend, and system design",
    "venue": "Pune International Convention Centre",
    "eventDate": "2026-07-20T00:00:00",
    "availableTickets": 140
  }'
```

**For local testing, replace the URL with:**
```bash
curl -X POST http://localhost:8080/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Stack Developer Conference",
    "description": "Hands-on sessions covering frontend, backend, and system design",
    "venue": "Pune International Convention Centre",
    "eventDate": "2026-07-20T00:00:00",
    "availableTickets": 140
  }'
```

---
## 💾 Database Schema

### SQL Schema Dump

```sql
-- Users Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Events Table
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    venue VARCHAR(255),
    event_date TIMESTAMP,
    available_tickets INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id BIGINT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_event_id ON bookings(event_id);
CREATE INDEX idx_bookings_booked_at ON bookings(booked_at);
CREATE INDEX idx_events_title ON events(title);
```

---
## �📸 Screenshots

### Events Page
![Events Page](assets/Screenshot%20from%202026-01-09%2023-06-25.png)

### Event Details
![Event Details](assets/Screenshot%20from%202026-01-09%2023-06-52.png)

### Booking Flow
![Booking Flow](assets/Screenshot%20from%202026-01-09%2023-07-00.png)

### User Authentication
![User Authentication](assets/Screenshot%20from%202026-01-09%2023-07-03.png)

### Bookings Page
![Bookings Page](assets/Screenshot%20from%202026-01-09%2023-07-06.png)

### Analytics Dashboard
![Analytics Dashboard](assets/Screenshot%20from%202026-01-09%2023-07-08.png)

### Mobile Responsive UI
![Mobile Responsive](assets/Screenshot%20from%202026-01-09%2023-07-11.png)
