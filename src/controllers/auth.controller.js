import {
  loginApi,
  signupApi,
  forgotPasswordApi,
  verifyOtpApi,
  resetPasswordApi,
} from "../api/auth.api";

export const loginController = async ({ data, onSuccess, setError }) => {
  try {
    const res = await loginApi(data);

    const token = res.data.token;
    const name = res.data.user.name;

    localStorage.setItem("token", token);
    onSuccess({ name });

    onSuccess({ name, token });
  } catch (err) {
    setError(err.message || "Login error");
  }
};

export const signupController = async ({ data, onSuccess, setError }) => {
  try {
    const res = await signupApi(data);

    if (!res.success) {
      throw new Error(res.message || "Signup failed");
    }

    onSuccess();
  } catch (err) {
    setError(err.message);
  }
};

export const forgotController = async ({ email, onSuccess, setError }) => {
  try {
    await forgotPasswordApi(email);

    // ✅ If we reached here, request was 200 OK
    onSuccess();
  } catch (err) {
    setError(err.message || "Failed to send OTP");
  }
};

export const verifyOtpController = async ({ otp, onSuccess, setError }) => {
  try {
    await verifyOtpApi(Number(otp));
    // 👆 if backend returned 200, OTP is verified

    onSuccess(); // ✅ navigate("/reset-password")
  } catch (err) {
    setError(err.message || "Invalid or expired OTP");
  }
};

export const resetPasswordController = async ({
  data,
  onSuccess,
  setError,
}) => {
  try {
    await resetPasswordApi(data); // trust HTTP status
    onSuccess();
  } catch (err) {
    setError(err.message || "Failed to reset password");
  }
};
