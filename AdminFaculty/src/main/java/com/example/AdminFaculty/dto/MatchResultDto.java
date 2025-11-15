package com.example.AdminFaculty.dto;

public class MatchResultDto {
    public Long facultyId;
    public String fullName;
    public String whatsappNumber;
    public double score;
    public java.util.List<String> matchedReasons; // e.g., ["subject","time"]
}