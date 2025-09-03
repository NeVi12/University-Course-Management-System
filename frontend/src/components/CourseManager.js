import React, { useEffect, useState } from "react";
import courseService from "../services/courseService";
import "./CourseManager.css";

function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ code: "", title: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editCourse, setEditCourse] = useState({ code: "", title: "" });

  useEffect(() => {
    courseService.getCourses().then((res) => setCourses(res.data));
  }, []);

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.title) {
      alert("Please enter both Course Code and Title");
      return;
    }
    courseService.addCourse(newCourse).then((res) => {
      setCourses([...courses, res.data]);
      setNewCourse({ code: "", title: "" });
    });
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      courseService.deleteCourse(id).then(() => {
        setCourses(courses.filter((c) => c.id !== id));
      });
    }
  };

  const handleEditCourse = (course) => {
    setEditingId(course.id);
    setEditCourse({ code: course.code, title: course.title });
  };

  const handleSaveCourse = (id) => {
    if (!editCourse.code || !editCourse.title) {
      alert("Please enter both Course Code and Title");
      return;
    }
    courseService.updateCourse(id, editCourse).then((res) => {
      setCourses(
        courses.map((c) => (c.id === id ? { ...c, ...editCourse } : c))
      );
      setEditingId(null);
    });
  };


  // Filter courses
const filteredCourses = courses.filter((course) => {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return true;

  const termNum = Number(term);

  // If search term is a valid integer -> match course ID exactly
  if (!isNaN(termNum) && term !== "" && /^\d+$/.test(term)) {
    return course.id === termNum;
  }

  // Otherwise -> match by code or title
  if (course.code?.toLowerCase().includes(term)) return true;
  if (course.title?.toLowerCase().includes(term)) return true;

  return false;
});

  return (
    <div className="manager">
      <h2>Course Management</h2>

      {/* Add Course Form */}
      <div className="form-container">
        <input
          placeholder="Course Code"
          value={newCourse.code}
          onChange={(e) =>
            setNewCourse({ ...newCourse, code: e.target.value })
          }
        />
        <input
          placeholder="Course Title"
          value={newCourse.title}
          onChange={(e) =>
            setNewCourse({ ...newCourse, title: e.target.value })
          }
        />
        <button onClick={handleAddCourse}>Add</button>
      </div>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by ID, Code, or Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Courses Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>
                    {editingId === c.id ? (
                      <input
                        value={editCourse.code}
                        onChange={(e) =>
                          setEditCourse({ ...editCourse, code: e.target.value })
                        }
                      />
                    ) : (
                      c.code
                    )}
                  </td>
                  <td>
                    {editingId === c.id ? (
                      <input
                        value={editCourse.title}
                        onChange={(e) =>
                          setEditCourse({ ...editCourse, title: e.target.value })
                        }
                      />
                    ) : (
                      c.title
                    )}
                  </td>
                  <td>
                    {editingId === c.id ? (
                      <button
                        className="save-btn"
                        onClick={() => handleSaveCourse(c.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="edit-btn"
                        onClick={() => handleEditCourse(c)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteCourse(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseManager;
