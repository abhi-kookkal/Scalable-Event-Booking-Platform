package com.example.backend.service;

import com.example.backend.entity.Booking;
import com.example.backend.entity.Event;
import com.example.backend.entity.User;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.EventRepository;
import org.springframework.stereotype.Service;
import com.example.backend.exception.BadRequestException;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;

    public BookingService(BookingRepository bookingRepository,
                          EventRepository eventRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
    }

    public Booking createBooking(User user, Long eventId, Integer quantity) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (quantity <= 0) {
            throw new BadRequestException("Quantity must be greater than 0");
        }

        if (event.getAvailableTickets() < quantity) {
            throw new BadRequestException("Not enough tickets available");
        }


        // Reduce available tickets
        event.setAvailableTickets(event.getAvailableTickets() - quantity);
        eventRepository.save(event);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setQuantity(quantity);

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByUser(User user) {
        return bookingRepository.findByUser(user);
    }

    public void deleteBooking(Long bookingId, User user) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.NOT_FOUND, "Booking not found"));

        if (booking.getUser() == null || !booking.getUser().getId().equals(user.getId())) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.FORBIDDEN, "Not allowed to delete this booking");
        }

        bookingRepository.delete(booking);
    }
}
