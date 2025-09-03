import axios from "axios";

const API_URL = "http://localhost:8080/api/registrations";

const registrationService = {
  getRegistrations: () => axios.get(API_URL),
  getRegistration: (id) => axios.get(`${API_URL}/${id}`),
  addRegistration: (registration) => axios.post(API_URL, registration),
  updateRegistration: (id, registration) => axios.put(`${API_URL}/${id}`, registration),
  deleteRegistration: (id) => axios.delete(`${API_URL}/${id}`),
};

export default registrationService;
