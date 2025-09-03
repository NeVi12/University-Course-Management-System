import axios from "axios";

const API_URL = "http://localhost:8080/api/students";

const studentService = {
  getStudents: () => axios.get(API_URL),
  getStudent: (id) => axios.get(`${API_URL}/${id}`),
  addStudent: (student) => axios.post(API_URL, student),
  updateStudent: (id, student) => axios.put(`${API_URL}/${id}`, student),
  deleteStudent: (id) => axios.delete(`${API_URL}/${id}`),
};

export default studentService;
