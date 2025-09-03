package com.example.coursemanagement.dto;

public class ResultDTO {
    private Long id;
    private String grade;
    private Long studentId;
    private String studentName;
    private String courseCode;
    private String courseTitle;

    public ResultDTO(Long id, String grade, Long studentId, String studentName, String courseCode, String courseTitle) {
        this.id = id;
        this.grade = grade;
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }
}
