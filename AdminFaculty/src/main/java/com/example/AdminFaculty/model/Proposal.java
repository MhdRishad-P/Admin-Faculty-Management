package com.example.AdminFaculty.model;

import jakarta.persistence.*;

@Entity
@Table(name = "proposals")
public class Proposal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private String className;
    private String subject;

    // simplified time as string for demo; can be LocalDateTime in extended version
    private String time;
    private String language;

    public Proposal() {}

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
}
