package com.example.backend.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimiterService {

    private static final Logger logger = LoggerFactory.getLogger(RateLimiterService.class);

    // One bucket per user (key = normalized email or anonymous)
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    public boolean allowRequest(String userKey) {
        String key = normalizeKey(userKey);
        Bucket bucket = buckets.computeIfAbsent(key, k -> createBucket(k));
        boolean allowed = bucket.tryConsume(1);
        if (!allowed) {
            logger.warn("Rate limit exceeded for key={}", key);
        }
        return allowed;
    }

    private String normalizeKey(String userKey) {
        if (userKey == null || userKey.trim().isEmpty()) {
            return "anonymous";
        }
        return userKey.trim().toLowerCase();
    }

    private Bucket createBucket(String userKey) {
        // 5 tokens max, refill 5 tokens every 1 minute (greedy refill)
        Bandwidth limit = Bandwidth.classic(
                5,
                Refill.greedy(5, Duration.ofMinutes(1))
        );
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
}
