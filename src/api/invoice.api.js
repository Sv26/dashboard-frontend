import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://dashboard-backend-s2b3.onrender.com",
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getInvoices = async () => {
  const res = await axios.get("/invoice");
  return res.data;
};

export const getInvoiceSummary = async () => {
  const res = await axios.get("/invoice/summary");
  return res.data;
};

export const updateInvoiceStatus = async (id, status) => {
  const res = await axios.patch(`/invoice/${id}/status`, { status });
  return res.data;
};

export const deleteInvoice = async (id) => {
  const res = await axios.delete(`/invoice/${id}`);
  return res.data;
};

export default axios;
