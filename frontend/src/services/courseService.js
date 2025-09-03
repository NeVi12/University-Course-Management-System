import axios from "axios";

const API_URL = "http://localhost:8080/api/courses";

const courseService = {
  getCourses: () => axios.get(API_URL),
  getCourse: (id) => axios.get(`${API_URL}/${id}`),
  addCourse: (course) => axios.post(API_URL, course),
  updateCourse: (id, course) => axios.put(`${API_URL}/${id}`, course),
  deleteCourse: (id) => axios.delete(`${API_URL}/${id}`),
};

export default courseService;
