package com.example.AdminFaculty.controller;

import com.example.AdminFaculty.model.Faculty;
import com.example.AdminFaculty.model.Interest;
import com.example.AdminFaculty.model.Proposal;
import com.example.AdminFaculty.repository.FacultyRepository;
import com.example.AdminFaculty.repository.InterestRepository;
import com.example.AdminFaculty.repository.ProposalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class FacultyController {

    private final FacultyRepository facultyRepository;
    private final ProposalRepository proposalRepository;
    private final InterestRepository interestRepository;

    public FacultyController(FacultyRepository facultyRepository, ProposalRepository proposalRepository,
                             InterestRepository interestRepository) {
        this.facultyRepository = facultyRepository;
        this.proposalRepository = proposalRepository;
        this.interestRepository = interestRepository;
    }

    // ✅ Faculty login (simple)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Faculty req) {
        Optional<Faculty> faculty = facultyRepository.findByNameAndPassword(req.getName(), req.getPassword());
        if (faculty.isPresent()) {
            return ResponseEntity.ok(faculty.get());
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }


    // ✅ Get all proposals (for faculty to view)
    @GetMapping("/proposals")
    public ResponseEntity<List<Proposal>> getAllProposals() {
        return ResponseEntity.ok(proposalRepository.findAll());
    }

    // ✅ Faculty expresses interest in a proposal
    @PostMapping("/interest/{facultyId}/{proposalId}")
    public ResponseEntity<String> expressInterest(@PathVariable Long facultyId, @PathVariable Long proposalId) {
        Optional<Faculty> facultyOpt = facultyRepository.findById(facultyId);
        Optional<Proposal> proposalOpt = proposalRepository.findById(proposalId);

        if (facultyOpt.isEmpty() || proposalOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid faculty or proposal");
        }

        Interest interest = new Interest();
        interest.setFaculty(facultyOpt.get());
        interest.setProposal(proposalOpt.get());
        interest.setExpressedAt(LocalDateTime.now());
        interestRepository.save(interest);

        return ResponseEntity.ok("Interest recorded");
    }

    // ✅ Admin can later view all interests ranked
    @GetMapping("/interests")
    public ResponseEntity<List<Interest>> getAllInterests() {
        List<Interest> all = interestRepository.findAll();
        return ResponseEntity.ok(all);
    }
}
