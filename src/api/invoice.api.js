import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://dashboard-backend-s2b3.onrender.com/api/invoice",
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ❗ DO NOT ADD /invoice BELOW */

export const getInvoices = async () => {
  const res = await axios.get("/"); // ✅
  return res.data;
};

export const getInvoiceSummary = async () => {
  const res = await axios.get("/summary"); // ✅
  return res.data;
};

export const updateInvoiceStatus = async (id, status) => {
  const res = await axios.patch(`/${id}/status`, { status }); // ✅
  return res.data;
};

export const deleteInvoice = async (id) => {
  const res = await axios.delete(`/${id}`); // ✅
  return res.data;
};

export default axios;
