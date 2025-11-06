package com.example.AdminFaculty.service;

import com.example.AdminFaculty.model.Faculty;
import com.example.AdminFaculty.repository.FacultyRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FacultyService {

    private final FacultyRepository facultyRepository;

    public FacultyService(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    public Faculty addFaculty(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    public List<Faculty> getAllFaculties() {
        return facultyRepository.findAll();
    }
}
