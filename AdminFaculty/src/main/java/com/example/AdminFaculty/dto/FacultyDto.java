package com.example.AdminFaculty.dto;// backend/src/main/java/com/example/facultymgmt/dto/FacultyDto.java


import java.util.List;
import java.util.Map;

public class FacultyDto {
    public Long id;
    public String fullName;
    public String whatsappNumber;
    public List<String> subjects;
    public List<String> languageSkills;
    public List<String> teachingGrades;
    public List<Map<String,String>> availableHours; // list of {"from":"14:00","to":"18:00"}
}
