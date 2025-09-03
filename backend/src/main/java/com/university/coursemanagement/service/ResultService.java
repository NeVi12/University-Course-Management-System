package com.example.coursemanagement.service;

import com.example.coursemanagement.dto.CreateResultRequest;
import com.example.coursemanagement.dto.ResultDTO;
import com.example.coursemanagement.dto.UpdateResultRequest;
import com.example.coursemanagement.model.Registration;
import com.example.coursemanagement.model.Result;
import com.example.coursemanagement.repository.RegistrationRepository;
import com.example.coursemanagement.repository.ResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResultService {
    private final ResultRepository resultRepository;
    private final RegistrationRepository registrationRepository;

    public ResultService(ResultRepository resultRepository, RegistrationRepository registrationRepository) {
        this.resultRepository = resultRepository;
        this.registrationRepository = registrationRepository;
    }

    // Convert Result -> ResultDTO
    private ResultDTO toDTO(Result result) {
        Registration reg = result.getRegistration();
        return new ResultDTO(
                result.getId(),
                result.getGrade(),
                reg.getStudent().getId(),
                reg.getStudent().getName(),
                reg.getCourse().getCode(),
                reg.getCourse().getTitle()
        );
    }

    // All results
    public List<ResultDTO> getAllResultDTOs() {
        return resultRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Single result
    public ResultDTO getResultDTOById(Long id) {
        return resultRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Result not found with id: " + id));
    }

    // Add result using studentId + courseCode
public ResultDTO addResult(CreateResultRequest req) {
    Registration registration = registrationRepository
            .findByStudent_IdAndCourse_Code(req.getStudentId(), req.getCourseCode())  // ✅ correct method
            .orElseThrow(() -> new RuntimeException(
                    "Registration not found for studentId: " + req.getStudentId() +
                    " and courseCode: " + req.getCourseCode()
            ));

    Result result = new Result();
    result.setGrade(req.getGrade());
    result.setRegistration(registration);

    return toDTO(resultRepository.save(result));
}

    // Update grade
    public ResultDTO updateResult(Long id, UpdateResultRequest req) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Result not found with id: " + id));
        result.setGrade(req.getGrade());
        return toDTO(resultRepository.save(result));
    }

    // Delete
    public void deleteResult(Long id) {
        if (!resultRepository.existsById(id)) {
            throw new RuntimeException("Result not found with id: " + id);
        }
        resultRepository.deleteById(id);
    }

    // Search by studentId
    public List<ResultDTO> getResultsByStudentId(Long studentId) {
        return resultRepository.findByRegistration_Student_Id(studentId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Search by student name
    public List<ResultDTO> getResultsByStudentName(String name) {
        return resultRepository.findByRegistration_Student_NameContainingIgnoreCase(name)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Search by course code
    public List<ResultDTO> getResultsByCourseCode(String code) {
        return resultRepository.findByRegistration_Course_CodeContainingIgnoreCase(code)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
