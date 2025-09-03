package com.example.coursemanagement.repository;

import com.example.coursemanagement.model.Registration;
import com.example.coursemanagement.model.Student;
import com.example.coursemanagement.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByStudent(Student student);
    List<Registration> findByCourse(Course course);

    Optional<Registration> findByStudent_IdAndCourse_Code(Long studentId, String courseCode);
}


