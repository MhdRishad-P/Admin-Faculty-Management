package com.example.AdminFaculty.service;// WhatsAppService.java (simplified)

import org.springframework.stereotype.Service;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class WhatsAppService {
    public String createClickToChatLink(String phoneNumber, String message) {
        // phoneNumber must be in international format without '+' for wa.me
        String normalized = phoneNumber.replaceAll("[^0-9]", "");
        String encoded = URLEncoder.encode(message, StandardCharsets.UTF_8);
        return "https://wa.me/" + normalized + "?text=" + encoded;
    }

    // Optional: add Twilio send function if you enable Twilio dependency and env vars
}
