package com.example.backend.controller;

import com.example.backend.entity.Booking;
import com.example.backend.entity.User;
import com.example.backend.exception.RateLimitException;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.BookingService;
import com.example.backend.security.RateLimiterService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepository;
    private final RateLimiterService rateLimiterService;

    public BookingController(BookingService bookingService,
                             UserRepository userRepository,
                             RateLimiterService rateLimiterService) {
        this.bookingService = bookingService;
        this.userRepository = userRepository;
        this.rateLimiterService = rateLimiterService;
    }

    // POST /bookings
    @PostMapping
    public Booking createBooking(Authentication authentication,
                                 @RequestParam Long eventId,
                                 @RequestParam Integer quantity) {

        String email = authentication.getName();

        // enforce rate limit per user (email)
        if (!rateLimiterService.allowRequest(email)) {
    throw new RateLimitException(
        "Rate limit exceeded. Max 5 bookings per minute."
    );
}


        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingService.createBooking(user, eventId, quantity);
    }


    // GET /bookings/my
    @GetMapping("/my")
    public List<Booking> myBookings(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingService.getBookingsByUser(user);
    }

    // DELETE /bookings/{id}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBooking(Authentication authentication,
                              @PathVariable Long id) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // delegate to service (service should validate ownership/permissions)
        bookingService.deleteBooking(id, user);
    }
}
