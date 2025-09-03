# University-Course-Management-System

A full-stack **Course Management Web Application** built with:

- ⚙️ **Spring Boot (Java 22)** – Backend REST API  
- 💻 **React.js** – Frontend UI  
- 🗄️ **MySQL / H2** – Database (JPA with Hibernate)  
- 🚀 **Maven + npm** – Build & Run  

---

## ✨ Features

✅ **Student Management**
- Add, edit, delete, and search students by ID or name  

✅ **Course Management**
- Manage courses (create, list, search by code/title)  

✅ **Registrations**
- Register students into courses  
- Search by **Student ID, Name, or Course Code**   

✅ **Results**
- Assign and manage course results for students  
- Search results by course code  

---

## ⚡ Getting Started

### 🔹 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/course-management.git
cd course-management
```

### 🔹 2. Run Backend (Spring Boot)
```bash
cd backend
.\mvnw spring-boot:run
```
Backend will start on http://localhost:8080

### 🔹 3. Run Frontend (React)
```bash
cd frontend
npm install
npm start
```
Frontend will start on http://localhost:3000

🔌 API Endpoints (Backend)
| Method | Endpoint                  | Description                |
| ------ | ------------------------- | -------------------------- |
| GET    | `/api/students`           | Get all students           |
| POST   | `/api/students`           | Add new student            |
| PUT    | `/api/students/{id}`      | Update student             |
| DELETE | `/api/students/{id}`      | Delete student             |
| GET    | `/api/courses`            | Get all courses            |
| POST   | `/api/courses`            | Add new course             |
| GET    | `/api/registrations`      | Get all registrations      |
| POST   | `/api/registrations`      | Register student to course |
| PUT    | `/api/registrations/{id}` | Update registration        |
| DELETE | `/api/registrations/{id}` | Delete registration        |
| GET    | `/api/results`            | Get all results            |
| POST   | `/api/results`            | Add new result             |

🛠️ Tech Stack

Backend: Spring Boot, Spring Data JPA, Hibernate, Maven

Frontend: React.js, Axios, CSS

Database: H2

Tools: VS Code, Git, npm
