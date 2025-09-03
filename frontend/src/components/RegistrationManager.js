import React, { useEffect, useState } from "react";
import registrationService from "../services/registrationService";
import studentService from "../services/studentService";
import courseService from "../services/courseService";
import "./Manager.css";

function RegistrationManager() {
  const [registrations, setRegistrations] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newReg, setNewReg] = useState({ studentId: "", courseCode: "" });

  // Fetch data on mount
  useEffect(() => {
    registrationService
      .getRegistrations()
      .then((res) =>
        setRegistrations(res.data.filter((r) => r.student && r.course))
      )
      .catch((err) => console.error(err));

    studentService
      .getStudents()
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));

    courseService
      .getCourses()
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Helpers
  const getStudentName = (id) =>
    students.find((s) => s.id === parseInt(id))?.name || "";
  const getCourseTitle = (code) =>
    courses.find((c) => c.code.toLowerCase() === code.toLowerCase())?.title ||
    "";

  // Add registration
  const handleAddRegistration = () => {
    const student = students.find((s) => s.id === parseInt(newReg.studentId));
    const course = courses.find(
      (c) => c.code.toLowerCase() === newReg.courseCode.toLowerCase()
    );

    if (!student || !course) {
      alert("Invalid Student ID or Course Code");
      return;
    }

    // 🔍 Prevent duplicates
    const alreadyRegistered = registrations.some(
      (r) => r.student.id === student.id && r.course.id === course.id
    );

    if (alreadyRegistered) {
      alert(
        `Student ${student.name} (ID: ${student.id}) is already registered for ${course.code}`
      );
      return;
    }

    registrationService
      .addRegistration({
        student: { id: student.id },
        course: { id: course.id },
      })
      .then((res) => {
        // Ensure we store full objects, not just IDs
        const newRegistration = {
          ...res.data,
          student: student,
          course: course,
        };
        setRegistrations([...registrations, newRegistration]);
      })
      .catch((err) => console.error(err));

    setNewReg({ studentId: "", courseCode: "" });
  };


  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    if (!reg.student || !reg.course) return false;

    const term = searchTerm.trim().toLowerCase();
    const termNum = Number(term);

    // If search term is a valid number -> match ONLY student ID exactly
    if (!isNaN(termNum) && term !== "" && /^\d+$/.test(term)) {
      return reg.student.id === termNum;
    }

    // Otherwise -> match by name or course code
    if (reg.student.name?.toLowerCase().includes(term)) return true;
    if (reg.course.code?.toLowerCase().includes(term)) return true;

    return false;
  });

  return (
    <div className="manager">
      <h2>Course Registration Management</h2>

      {/* Add Registration Form */}
      <div className="form-container">
        <input
          type="number"
          placeholder="Student ID"
          value={newReg.studentId}
          onChange={(e) =>
            setNewReg({ ...newReg, studentId: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Student Name"
          value={getStudentName(newReg.studentId)}
          disabled
        />
        <input
          type="text"
          placeholder="Course Code"
          value={newReg.courseCode}
          onChange={(e) =>
            setNewReg({ ...newReg, courseCode: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Course Title"
          value={getCourseTitle(newReg.courseCode)}
          disabled
        />
        <button onClick={handleAddRegistration}>Register</button>
      </div>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Student ID, Name, or Course Code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Registrations Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Registration ID</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Course Code</th>
              <th>Course Title</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((reg) => (
                <tr key={reg.id}>
                  <td>{reg.id}</td>
                  <td>{reg.student.id}</td>
                  <td>{reg.student.name}</td>
                  <td>{reg.course.code}</td>
                  <td>{reg.course.title}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegistrationManager;
