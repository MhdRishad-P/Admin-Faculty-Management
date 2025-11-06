package com.example.AdminFaculty.model;

import jakarta.persistence.*;

@Entity
@Table(name = "faculties")
public class Faculty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String teachingClasses;
    private String teachingSubjects;
    private String whatsappNumber;
    private String syllabus;

    @Enumerated(EnumType.STRING)
    @Column(name = "faculty_rank") // avoid using reserved keyword 'rank'
    private Rank rank;

    private String password;
    private String authToken;

    public Faculty() {}

    public Faculty(String name,String password,String teachingClasses,String teachingSubjects,String whatsappNumber,String syllabus,String authToken,Rank rank){
        this.name=name;
        this.password=password;
        this.syllabus=syllabus;
        this.whatsappNumber=whatsappNumber;
        this.teachingClasses=teachingClasses;
        this.teachingSubjects=teachingSubjects;
        this.rank=rank;
    }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTeachingClasses() { return teachingClasses; }
    public void setTeachingClasses(String teachingClasses) { this.teachingClasses = teachingClasses; }

    public String getTeachingSubjects() { return teachingSubjects; }
    public void setTeachingSubjects(String teachingSubjects) { this.teachingSubjects = teachingSubjects; }

    public Rank getRank() { return rank; }
    public void setRank(Rank rank) { this.rank = rank; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getAuthToken() { return authToken; }
    public void setAuthToken(String authToken) { this.authToken = authToken; }

    public String getWhatsappNumber(){return whatsappNumber;}
    public void setWhatsappNumber(String whatsappNumber){this.whatsappNumber=whatsappNumber;}

    public String getSyllabus(){return syllabus;}
    public void setSyllabus(String syllabus){this.syllabus=syllabus;}
}
