const API_URL = "https://dashboard-backend-s2b3.onrender.com";

const post = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const loginApi = (data) => post(`${API_URL}/login`, data);
export const signupApi = (data) => post(`${API_URL}/signup`, data);
export const forgotPasswordApi = (email) =>
  post(`${API_URL}/forgot-password`, { email });
export const verifyOtpApi = (otp) =>
  post(`${API_URL}/verify-reset-otp`, { otp });
export const resetPasswordApi = (data) =>
  post(`${API_URL}/reset-password`, data);
