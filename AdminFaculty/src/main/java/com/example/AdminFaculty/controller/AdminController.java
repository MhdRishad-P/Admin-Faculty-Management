package com.example.AdminFaculty.controller;// AdminController.java

import com.example.AdminFaculty.service.FacultyService;
import com.example.AdminFaculty.dto.FacultyDto;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    private final FacultyService service;
    public AdminController(FacultyService service){this.service=service;}

    @GetMapping("/faculties")
    public List<FacultyDto> getAll() throws Exception { return service.findAll(); }

    @PostMapping("/faculties")
    public FacultyDto add(@RequestBody FacultyDto dto) throws Exception { return service.save(dto); }

    @PutMapping("/faculties/{id}")
    public FacultyDto update(@PathVariable Long id, @RequestBody FacultyDto dto) throws Exception {
        dto.id = id;
        return service.save(dto);
    }

    @DeleteMapping("/faculties/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
