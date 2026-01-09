package com.example.backend.repository;

import com.example.backend.dto.TopEventDTO;
import com.example.backend.entity.Booking;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Existing method (keep this)
    List<Booking> findByUser(User user);

    // 🔥 NEW: Top booked events query
    @Query("""
        SELECT 
            e.id AS id,
            e.title AS title,
            SUM(b.quantity) AS totalBookings
        FROM Booking b
        JOIN b.event e
        GROUP BY e.id, e.title
        ORDER BY totalBookings DESC
    """)
    List<TopEventDTO> findTopBookedEvents();
}
