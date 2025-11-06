package com.example.AdminFaculty.repository;

import com.example.AdminFaculty.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    Optional<Faculty> findByNameAndPassword(String name, String password);
}
