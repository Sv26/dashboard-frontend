import {
  loginApi,
  signupApi,
  forgotPasswordApi,
  verifyOtpApi,
  resetPasswordApi,
} from "../api/auth.api";

/* ================= LOGIN ================= */
export const loginController = async ({ data, onSuccess, setError }) => {
  try {
    const res = await loginApi(data);
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    onSuccess({ name: user.name, token });
  } catch (err) {
    setError(err.message || "Invalid email or password");
  }
};

/* ================= SIGNUP ================= */
export const signupController = async ({ data, onSuccess, setError }) => {
  try {
    const res = await signupApi(data);

    if (!res.success) {
      throw new Error(res.message || "Signup failed");
    }

    onSuccess();
  } catch (err) {
    setError(err.message || "Signup failed");
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotController = async ({ email, onSuccess, setError }) => {
  try {
    await forgotPasswordApi(email);
    onSuccess(); // UI decides what to show
  } catch (err) {
    setError(err.message || "Failed to send OTP");
  }
};

/* ================= VERIFY OTP ================= */
export const verifyOtpController = async ({ otp, onSuccess, setError }) => {
  try {
    await verifyOtpApi(otp);
    onSuccess();
  } catch (err) {
    setError(err.message || "Invalid or expired OTP");
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPasswordController = async ({
  data,
  onSuccess,
  setError,
}) => {
  try {
    await resetPasswordApi(data);
    onSuccess();
  } catch (err) {
    setError(err.message || "Failed to reset password");
  }
};
