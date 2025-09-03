package com.example.coursemanagement.repository;

import com.example.coursemanagement.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

    // Find results by student ID
    List<Result> findByRegistration_Student_Id(Long studentId);

    // Find results by student name (partial, case-insensitive)
    List<Result> findByRegistration_Student_NameContainingIgnoreCase(String studentName);

    // Find results by course code (partial, case-insensitive)
    List<Result> findByRegistration_Course_CodeContainingIgnoreCase(String courseCode);
}
