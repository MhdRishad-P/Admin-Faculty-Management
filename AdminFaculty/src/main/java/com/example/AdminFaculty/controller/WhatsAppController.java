package com.example.AdminFaculty.controller;// WhatsAppController.java

import com.example.AdminFaculty.service.WhatsAppService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/whatsapp")
@CrossOrigin(origins = "*")
public class WhatsAppController {
    private final WhatsAppService svc;
    public WhatsAppController(WhatsAppService svc){this.svc=svc;}

    @PostMapping("/create-link")
    public Map<String,String> createLink(@RequestBody Map<String,String> body) {
        String phone = body.get("phone");
        String message = body.get("message");
        String link = svc.createClickToChatLink(phone, message);
        return Map.of("waLink", link);
    }
}
