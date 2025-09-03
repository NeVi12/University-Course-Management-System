package com.example.coursemanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String grade;

    @OneToOne
    @JoinColumn(name = "registration_id")
    @JsonIgnore // Prevent recursion when serializing Registration
    private Registration registration;

    public Result() {}

    public Result(String grade, Registration registration) {
        this.grade = grade;
        this.registration = registration;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public Registration getRegistration() { return registration; }
    public void setRegistration(Registration registration) { this.registration = registration; }
}
