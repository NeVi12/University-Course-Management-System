# University-Course-Management-System

A full-stack **Course Management Web Application** built with:

- ⚙️ **Spring Boot** – Backend REST API  
- 💻 **React.js** – Frontend UI  
- 🗄️ **H2** – Database (JPA with Hibernate)  
- 🚀 **Maven + npm** – Build & Run
- 🚌 **Docker Containerization** - Easy Deployment

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
```

### 🔹 2. Runing the Application
Open Terminal
```bash
cd course-management
docker-compose up --build
```
Backend will start on http://localhost:8080
Frontend will start on http://localhost:3000

### 🔹 3. Stop containers
```bash
docker-compose down
```

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
| GET    | `/api/results`            | Get all results            |
| POST   | `/api/results`            | Add new result             |

🛠️ Tech Stack

Backend: Spring Boot, Spring Data JPA, Hibernate, Maven

Frontend: React.js, Axios, CSS

Database: H2

Tools: VS Code, Git, npm, Docker
