package com.example.backend.service;

import com.example.backend.dto.TopEventDTO;
import com.example.backend.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingAnalyticsService {

    private final BookingRepository bookingRepository;

    public BookingAnalyticsService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<TopEventDTO> getTop3BookedEvents() {
        return bookingRepository.findTopBookedEvents()
                .stream()
                .limit(3)
                .toList();
    }
}
