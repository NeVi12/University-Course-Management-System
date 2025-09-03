import React, { useEffect, useState } from "react";
import studentService from "../services/studentService";
import "./StudentManager.css";

function StudentManager() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStudent, setEditingStudent] = useState(null); // store student being edited
  const [editData, setEditData] = useState({ name: "", email: "" });

  useEffect(() => {
    studentService.getStudents().then((res) => setStudents(res.data));
  }, []);

  // Add student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email) return;
    studentService.addStudent(newStudent).then((res) => {
      setStudents([...students, res.data]);
      setNewStudent({ name: "", email: "" });
    });
  };

  // Delete student
  const handleDeleteStudent = (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    studentService.deleteStudent(id).then(() => {
      setStudents(students.filter((s) => s.id !== id));
    });
  };

  // Start editing
  const handleEditClick = (student) => {
    setEditingStudent(student.id);
    setEditData({ name: student.name, email: student.email });
  };

  // Save edited student
  const handleSaveEdit = (id) => {
    studentService
      .updateStudent(id, editData)
      .then((res) => {
        setStudents(
          students.map((s) => (s.id === id ? { ...s, ...res.data } : s))
        );
        setEditingStudent(null);
      })
      .catch(() => alert("Error updating student"));
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingStudent(null);
    setEditData({ name: "", email: "" });
  };

  // Filter students by ID or name
  const filteredStudents = students.filter((s) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    if (/^\d+$/.test(term)) {
      return s.id === Number(term);
    }

    return s.name.toLowerCase().includes(term);
  });

  return (
    <div className="student-manager">
      <h2>Student Management</h2>

      {/* Add Student Form */}
      <div className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) =>
            setNewStudent({ ...newStudent, email: e.target.value })
          }
        />
        <button onClick={handleAddStudent}>Add Student</button>
      </div>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Student Cards */}
      <div className="student-cards">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((s) => (
            <div key={s.id} className="student-card">
              {editingStudent === s.id ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                  <div className="card-actions">
                    <button onClick={() => handleSaveEdit(s.id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{s.name}</h3>
                  <p>
                    <strong>ID:</strong> {s.id}
                  </p>
                  <p>
                    <strong>Email:</strong> {s.email}
                  </p>
                  <div className="card-actions">
                    <button onClick={() => handleEditClick(s)}>Edit</button>
                    <button onClick={() => handleDeleteStudent(s.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No students found
          </p>
        )}
      </div>
    </div>
  );
}

export default StudentManager;
