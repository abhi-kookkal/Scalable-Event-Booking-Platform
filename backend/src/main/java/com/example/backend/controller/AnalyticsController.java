package com.example.backend.controller;

import com.example.backend.dto.TopEventDTO;
import com.example.backend.service.BookingAnalyticsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    private final BookingAnalyticsService analyticsService;

    public AnalyticsController(BookingAnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    // GET /analytics/top-events
    @GetMapping("/top-events")
    public List<TopEventDTO> getTopEvents() {
        return analyticsService.getTop3BookedEvents();
    }
}
