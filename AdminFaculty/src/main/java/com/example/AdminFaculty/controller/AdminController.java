package com.example.AdminFaculty.controller;

import com.example.AdminFaculty.model.AdminLoginRequest;
import com.example.AdminFaculty.model.Faculty;
import com.example.AdminFaculty.model.Proposal;
import com.example.AdminFaculty.repository.FacultyRepository;
import com.example.AdminFaculty.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AdminController {

    // --- Hardcoded admin credentials from application.properties ---
    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    private final FacultyRepository facultyRepository;
    private final ProposalRepository proposalRepository;

    public AdminController(FacultyRepository facultyRepository, ProposalRepository proposalRepository) {
        this.facultyRepository = facultyRepository;
        this.proposalRepository = proposalRepository;
    }

    // ✅ Admin login endpoint
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminLoginRequest request) {
        if (request.getUsername().equals(adminUsername) &&
                request.getPassword().equals(adminPassword)) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // ✅ Add Faculty (only admin can add)
    @PostMapping("/add-faculty")
    public ResponseEntity<Faculty> addFaculty(@RequestBody Faculty faculty) {
        Faculty savedFaculty = facultyRepository.save(faculty);
        return ResponseEntity.ok(savedFaculty);
    }

    // ✅ Get all Faculties
    @GetMapping("/faculties")
    public ResponseEntity<List<Faculty>> getAllFaculties() {
        List<Faculty> faculties = facultyRepository.findAll();
        return ResponseEntity.ok(faculties);
    }

    @DeleteMapping("/faculty/{id}")
    public ResponseEntity<String> deleteFaculty(@PathVariable Long id) {
        facultyRepository.deleteById(id);
        return ResponseEntity.ok("Faculty deleted successfully");
    }

    // ✅ Create new class proposal
    @PostMapping("/proposal")
    public ResponseEntity<Proposal> createProposal(@RequestBody Proposal proposal) {
        Proposal savedProposal = proposalRepository.save(proposal);
        return ResponseEntity.ok(savedProposal);
    }

    // ✅ Get all proposals (to see interested faculties later)
    @GetMapping("/proposals")
    public ResponseEntity<List<Proposal>> getAllProposals() {
        List<Proposal> proposals = proposalRepository.findAll();
        return ResponseEntity.ok(proposals);
    }
}
