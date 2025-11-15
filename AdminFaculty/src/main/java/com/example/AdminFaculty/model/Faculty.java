package com.example.AdminFaculty.model;// backend/src/main/java/com/example/facultymgmt/model/Faculty.java


import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "faculties")
public class Faculty {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String whatsappNumber; // store in international format, e.g. +919876543210

    // store JSON arrays in MySQL JSON columns
    @Column(columnDefinition = "json")
    private String subjectsJson; // JSON array of strings

    @Column(columnDefinition = "json")
    private String languageSkillsJson;

    @Column(columnDefinition = "json")
    private String teachingGradesJson; // e.g. ["grade1","grade2"]

    @Column(columnDefinition = "json")
    private String availableHoursJson; // e.g. [{ "from": "14:00", "to": "18:00" }]

    // getters / setters
    // convenience methods to convert JSON <-> List can be in service/DTO layer
    // ...


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getWhatsappNumber() {
        return whatsappNumber;
    }

    public void setWhatsappNumber(String whatsappNumber) {
        this.whatsappNumber = whatsappNumber;
    }

    public String getSubjectsJson() {
        return subjectsJson;
    }

    public void setSubjectsJson(String subjectsJson) {
        this.subjectsJson = subjectsJson;
    }

    public String getLanguageSkillsJson() {
        return languageSkillsJson;
    }

    public void setLanguageSkillsJson(String languageSkillsJson) {
        this.languageSkillsJson = languageSkillsJson;
    }

    public String getTeachingGradesJson() {
        return teachingGradesJson;
    }

    public void setTeachingGradesJson(String teachingGradesJson) {
        this.teachingGradesJson = teachingGradesJson;
    }

    public String getAvailableHoursJson() {
        return availableHoursJson;
    }

    public void setAvailableHoursJson(String availableHoursJson) {
        this.availableHoursJson = availableHoursJson;
    }
}
