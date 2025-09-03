import axios from "axios";

const API_URL = "http://localhost:8080/api/results";

const resultService = {
  getResults: () => axios.get(API_URL),
  getResult: (id) => axios.get(`${API_URL}/${id}`),
  addResult: (result) => axios.post(API_URL, result),
  updateResult: (id, result) => axios.put(`${API_URL}/${id}`, result),
  deleteResult: (id) => axios.delete(`${API_URL}/${id}`),
};

export default resultService;
