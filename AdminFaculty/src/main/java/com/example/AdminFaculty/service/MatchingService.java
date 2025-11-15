package com.example.AdminFaculty.service;// MatchingService.java


import com.example.AdminFaculty.dto.*;
import org.springframework.stereotype.Service;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class MatchingService {
    private final FacultyService facultyService;
    private final ObjectMapper mapper = new ObjectMapper();
    private final DateTimeFormatter TF = DateTimeFormatter.ofPattern("HH:mm");

    public MatchingService(FacultyService facultyService){ this.facultyService = facultyService; }

    public List<MatchResultDto> match(MatchRequestDto req) throws Exception {
        List<FacultyDto> faculties = facultyService.findAll();
        List<MatchResultDto> results = new ArrayList<>();
        for (FacultyDto f : faculties) {
            double score = 0;
            List<String> reasons = new ArrayList<>();

            // subject match
            if (f.subjects != null && f.subjects.contains(req.subject)) {
                score += 40; reasons.add("subject");
            }

            // language match
            if (req.languagePreference != null && f.languageSkills != null &&
                    f.languageSkills.contains(req.languagePreference)) {
                score += 20; reasons.add("language");
            }

            // grade compatibility (simple contains check)
            if (req.requestedGrade != null && f.teachingGrades != null &&
                    f.teachingGrades.contains(req.requestedGrade)) {
                score += 10; reasons.add("grade");
            }

            // time overlap
            boolean overlap = checkTimeOverlap(f.availableHours, req.classFrom, req.classTo);
            if (overlap) { score += 30; reasons.add("time"); }

            MatchResultDto mr = new MatchResultDto();
            mr.facultyId = f.id;
            mr.fullName = f.fullName;
            mr.whatsappNumber = f.whatsappNumber;
            mr.score = score;
            mr.matchedReasons = reasons;
            results.add(mr);
        }
        results.sort((a,b)->Double.compare(b.score,a.score));
        return results;
    }

    private boolean checkTimeOverlap(List<Map<String,String>> availableHours, String classFrom, String classTo) {
        if (availableHours == null || availableHours.isEmpty()) return false;
        LocalTime cf = LocalTime.parse(classFrom, TF);
        LocalTime ct = LocalTime.parse(classTo, TF);
        for (Map<String,String> slot : availableHours) {
            String sFrom = slot.get("from"); String sTo = slot.get("to");
            LocalTime af = LocalTime.parse(sFrom, TF);
            LocalTime at = LocalTime.parse(sTo, TF);
            boolean intersects = !cf.isAfter(at) && !ct.isBefore(af);
            if (intersects) return true;
        }
        return false;
    }
}
