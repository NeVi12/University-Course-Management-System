import React, { useState } from "react";
import CourseManager from "./components/CourseManager";
import StudentManager from "./components/StudentManager";
import RegistrationManager from "./components/RegistrationManager";
import ResultManager from "./components/ResultManager";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("courses");

  const renderPage = () => {
    switch (activePage) {
      case "courses":
        return <CourseManager />;
      case "students":
        return <StudentManager />;
      case "registrations":
        return <RegistrationManager />;
      case "results":
        return <ResultManager />;
      default:
        return <CourseManager />;
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h2 className="navbar-title">🎓 University Management</h2>
        </div>
        <ul className="navbar-menu">
          <li
            className={activePage === "courses" ? "active" : ""}
            onClick={() => setActivePage("courses")}
          >
            Course Management
          </li>
          <li
            className={activePage === "students" ? "active" : ""}
            onClick={() => setActivePage("students")}
          >
            Student Management
          </li>
          <li
            className={activePage === "registrations" ? "active" : ""}
            onClick={() => setActivePage("registrations")}
          >
            Course Registrations
          </li>
          <li
            className={activePage === "results" ? "active" : ""}
            onClick={() => setActivePage("results")}
          >
            Student Results
          </li>
        </ul>
      </nav>

      {/* Page content */}
      <div className="content">{renderPage()}</div>
    </div>
  );
}

export default App;
