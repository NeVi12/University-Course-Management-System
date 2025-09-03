import React, { useEffect, useState } from "react";
import resultService from "../services/resultService";
import studentService from "../services/studentService";
import courseService from "../services/courseService";
import "./ResultManager.css";

function ResultManager() {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newResult, setNewResult] = useState({
    studentId: "",
    studentName: "",
    courseCode: "",
    courseTitle: "",
    grade: "",
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseSearchTerm, setCourseSearchTerm] = useState("");

  const grades = [
    "A+", "A", "B+", "B", "B-", "C+", "C", "C-", "D (Repeat)", "E (Full Module Repeat)"
  ];

  // Load data
  useEffect(() => {
    resultService.getResults().then((res) => setResults(res.data));
    studentService.getStudents().then((res) => setStudents(res.data));
    courseService.getCourses().then((res) => setCourses(res.data));
  }, []);

  // Auto-fill student name
  const handleStudentIdChange = (e) => {
    const id = e.target.value;
    setNewResult({ ...newResult, studentId: id });
    const student = students.find((s) => String(s.id) === id);
    setNewResult((prev) => ({ ...prev, studentName: student?.name || "" }));
  };

  // Auto-fill course title
  const handleCourseCodeChange = (e) => {
    const code = e.target.value;
    setNewResult({ ...newResult, courseCode: code });
    const course = courses.find((c) => c.code.toLowerCase() === code.toLowerCase());
    setNewResult((prev) => ({ ...prev, courseTitle: course?.title || "" }));
  };

  // Add result
  const handleAddResult = async () => {
    const { studentId, courseCode, grade } = newResult;
    if (!studentId || !courseCode || !grade) return;

    try {
      const res = await resultService.addResult(newResult);
      setResults([...results, res.data]);
      setNewResult({ studentId: "", studentName: "", courseCode: "", courseTitle: "", grade: "" });
    } catch (error) {
      alert("Error adding result: " + error.response?.data?.message || error.message);
    }
  };

  // Delete result
  const handleDeleteResult = async (id) => {
    try {
      await resultService.deleteResult(id);
      setResults(results.filter((r) => r.id !== id));
    } catch (error) {
      alert("Error deleting result");
    }
  };

  // Edit result grade
  const handleEditResult = async (id, newGrade) => {
    try {
      const res = await resultService.updateResult(id, { grade: newGrade });
      setResults(results.map((r) => (r.id === id ? { ...r, grade: res.data.grade } : r)));
    } catch (error) {
      alert("Error updating grade");
    }
  };

  // Filtered courses by search
  const filteredCourses = courses.filter((c) =>
    c.code.toLowerCase().includes(courseSearchTerm.toLowerCase())
  );

  // Filtered course results for modal
  const filteredCourseResults = results.filter((r) => {
    if (!selectedCourse) return false;
    if (r.courseCode.toLowerCase() !== selectedCourse.code.toLowerCase()) return false;

    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    return r.studentName?.toLowerCase().includes(term) || String(r.studentId).includes(term);
  });

  return (
    <div className="result-manager container">
      <h2 className="section-title">Result Management</h2>

      {/* Add Result Form */}
      <div className="card form-card">
        <h3 className="card-title">Add New Result</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Student ID</label>
            <input
              type="text"
              placeholder="Student ID"
              value={newResult.studentId}
              onChange={handleStudentIdChange}
            />
            {newResult.studentName && <small>({newResult.studentName})</small>}
          </div>

          <div className="form-group">
            <label>Course Code</label>
            <input
              type="text"
              placeholder="Course Code"
              value={newResult.courseCode}
              onChange={handleCourseCodeChange}
            />
            {newResult.courseTitle && <small>({newResult.courseTitle})</small>}
          </div>

          <div className="form-group">
            <label>Grade</label>
            <select
              value={newResult.grade}
              onChange={(e) => setNewResult({ ...newResult, grade: e.target.value })}
            >
              <option value="">Select Grade</option>
              {grades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="form-group form-action">
            <button className="btn-primary" onClick={handleAddResult}>Add Result</button>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="courses-section">
        <h3>Courses</h3>
        <input
          type="text"
          placeholder="Search by Course Code"
          value={courseSearchTerm}
          onChange={(e) => setCourseSearchTerm(e.target.value)}
          className="search-input"
        />
        <ul className="course-list">
          {filteredCourses.map((c) => (
            <li key={c.id} className="course-item" onClick={() => setSelectedCourse(c)}>
              {c.code} - {c.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Popup Modal */}
      {selectedCourse && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Results for {selectedCourse.code} - {selectedCourse.title}</h3>
              <button className="close-btn" onClick={() => setSelectedCourse(null)}>×</button>
            </div>

            <input
              className="search-input"
              placeholder="Search by Student ID/Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="results-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourseResults.map((r) => (
                  <tr key={r.id}>
                    <td>{r.studentId}</td>
                    <td>{r.studentName}</td>
                    <td>
                      <select value={r.grade} onChange={(e) => handleEditResult(r.id, e.target.value)}>
                        {grades.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button className="btn-danger" onClick={() => handleDeleteResult(r.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultManager;
