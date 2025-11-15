package com.example.AdminFaculty.service;// FacultyService.java (trimmed)

import com.example.AdminFaculty.dto.FacultyDto;
import com.example.AdminFaculty.model.Faculty;
import com.example.AdminFaculty.repository.FacultyRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class FacultyService {
    private final FacultyRepository repo;
    private final ObjectMapper mapper = new ObjectMapper();
    public FacultyService(FacultyRepository repo){this.repo=repo;}

    public FacultyDto toDto(Faculty f) throws Exception {
        FacultyDto d = new FacultyDto();
        d.id = f.getId();
        d.fullName = f.getFullName();
        d.whatsappNumber = f.getWhatsappNumber();
        d.subjects = mapper.readValue(f.getSubjectsJson(), List.class);
        d.languageSkills = mapper.readValue(f.getLanguageSkillsJson(), List.class);
        d.teachingGrades = mapper.readValue(f.getTeachingGradesJson(), List.class);
        d.availableHours = mapper.readValue(f.getAvailableHoursJson(), List.class);
        return d;
    }

    public Faculty fromDto(FacultyDto d) throws Exception {
        Faculty f = new Faculty();
        f.setId(d.id);
        f.setFullName(d.fullName);
        f.setWhatsappNumber(d.whatsappNumber);
        f.setSubjectsJson(mapper.writeValueAsString(d.subjects));
        f.setLanguageSkillsJson(mapper.writeValueAsString(d.languageSkills));
        f.setTeachingGradesJson(mapper.writeValueAsString(d.teachingGrades));
        f.setAvailableHoursJson(mapper.writeValueAsString(d.availableHours));
        return f;
    }

    public FacultyDto save(FacultyDto dto) throws Exception {
        Faculty f = fromDto(dto);
        Faculty saved = repo.save(f);
        return toDto(saved);
    }

    public List<FacultyDto> findAll() throws Exception {
        List<FacultyDto> out = new ArrayList<>();
        for(Faculty f: repo.findAll()) out.add(toDto(f));
        return out;
    }

    public void delete(Long id){ repo.deleteById(id); }

    public Optional<FacultyDto> findById(Long id) throws Exception {
        return repo.findById(id).map(f -> {
            try { return toDto(f); } catch(Exception e){ throw new RuntimeException(e); }
        });
    }
}
