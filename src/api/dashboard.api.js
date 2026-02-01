import Axios from "axios";

/* Axios instance */
const axios = Axios.create({
  baseURL: "https://dashboard-backend-s2b3.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* API functions */
export const fetchHomeDashboard = (range = "month") => {
  return axios.get(`/dashboard/home?range=${range}`);
};

export const fetchStatistics = (range = "month") => {
  return axios.get(`/statistics?range=${range}`);
};
