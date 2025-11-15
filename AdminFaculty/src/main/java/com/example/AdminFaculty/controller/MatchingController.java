package com.example.AdminFaculty.controller;// MatchingController.java

import com.example.AdminFaculty.dto.*;
import com.example.AdminFaculty.service.MatchingService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/match")
@CrossOrigin(origins = "*")
public class MatchingController {
    private final MatchingService ms;
    public MatchingController(MatchingService ms){this.ms=ms;}

    @PostMapping("/find")
    public List<MatchResultDto> findMatches(@RequestBody MatchRequestDto req) throws Exception {
        return ms.match(req);
    }
}
