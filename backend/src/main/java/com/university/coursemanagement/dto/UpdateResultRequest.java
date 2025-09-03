package com.example.coursemanagement.dto;

public class UpdateResultRequest {
    private String grade;

    public UpdateResultRequest() {}

    public UpdateResultRequest(String grade) {
        this.grade = grade;
    }

    // Getter and setter
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
}
