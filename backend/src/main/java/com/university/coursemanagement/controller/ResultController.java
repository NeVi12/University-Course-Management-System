package com.example.coursemanagement.controller;

import com.example.coursemanagement.dto.CreateResultRequest;
import com.example.coursemanagement.dto.ResultDTO;
import com.example.coursemanagement.dto.UpdateResultRequest;
import com.example.coursemanagement.service.ResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {
    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    // ✅ Get all results
    @GetMapping
    public List<ResultDTO> getAllResults() {
        return resultService.getAllResultDTOs();
    }

    // ✅ Get result by ID
    @GetMapping("/{id}")
    public ResultDTO getResultById(@PathVariable Long id) {
        return resultService.getResultDTOById(id);
    }

    // ✅ Add result (studentId + courseCode + grade)
    @PostMapping
    public ResultDTO addResult(@RequestBody CreateResultRequest req) {
        return resultService.addResult(req);
    }

    // ✅ Update only grade
    @PutMapping("/{id}")
    public ResultDTO updateResult(@PathVariable Long id, @RequestBody UpdateResultRequest req) {
        return resultService.updateResult(id, req);
    }

    // ✅ Delete result
    @DeleteMapping("/{id}")
    public void deleteResult(@PathVariable Long id) {
        resultService.deleteResult(id);
    }

    // 🔍 Search by Student ID
    @GetMapping("/student/{studentId}")
    public List<ResultDTO> getResultsByStudentId(@PathVariable Long studentId) {
        return resultService.getResultsByStudentId(studentId);
    }

    // 🔍 Search by Student Name
    @GetMapping("/student/search")
    public List<ResultDTO> getResultsByStudentName(@RequestParam String name) {
        return resultService.getResultsByStudentName(name);
    }

    // 🔍 Search by Course Code
    @GetMapping("/course/search")
    public List<ResultDTO> getResultsByCourseCode(@RequestParam String code) {
        return resultService.getResultsByCourseCode(code);
    }
}
