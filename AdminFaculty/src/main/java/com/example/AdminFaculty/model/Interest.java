package com.example.AdminFaculty.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "interests")
public class Interest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Proposal proposal;

    @ManyToOne
    private Faculty faculty;

    private LocalDateTime expressedAt;

    public Interest() {}

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Proposal getProposal() { return proposal; }
    public void setProposal(Proposal proposal) { this.proposal = proposal; }

    public Faculty getFaculty() { return faculty; }
    public void setFaculty(Faculty faculty) { this.faculty = faculty; }

    public LocalDateTime getExpressedAt() { return expressedAt; }
    public void setExpressedAt(LocalDateTime expressedAt) { this.expressedAt = expressedAt; }
}
