package com.example.AdminFaculty.dto;

public class MatchRequestDto {
    public String studentName;
    public String subject;
    public String syllabus;
    public String languagePreference;
    public String classFrom; // "14:00"
    public String classTo;   // "16:00"
    public String requestedGrade; // optional
}