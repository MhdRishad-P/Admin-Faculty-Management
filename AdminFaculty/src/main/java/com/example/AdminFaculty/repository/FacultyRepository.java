package com.example.AdminFaculty.repository;// FacultyRepository.java
import com.example.AdminFaculty.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    // standard CRUD is enough
}
