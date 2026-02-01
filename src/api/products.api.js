const API_URL = "https://dashboard-backend-s2b3.onrender.com";

/* =========================
   AUTH TOKEN
========================= */
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("AUTH_MISSING");
  }
  return token;
};

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

/* =========================
   RESPONSE HANDLER
========================= */
const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

/* =========================
   FETCH PRODUCTS
========================= */
export const fetchProducts = async ({
  page = 1,
  limit = 1000, // get all
  search = "",
}) => {
  const res = await fetch(
    `${API_URL}?page=${page}&limit=${limit}&search=${encodeURIComponent(
      search,
    )}`,
    { headers: headers() },
  );

  return handleResponse(res);
};

/* =========================
   ADD PRODUCT
========================= */
export const addProduct = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

/* =========================
   BUY PRODUCT
========================= */
export const buyProduct = async (data) => {
  const res = await fetch(`${API_URL}/buy`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

/* =========================
   UPLOAD CSV  ✅ FIXED
   (matches: router.post("/upload-csv", auth, uploadCSV))
========================= */
export const uploadCSV = async (rows) => {
  const res = await fetch(`${API_URL}/upload-csv`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ rows }),
  });

  return handleResponse(res);
};

/* =========================
   CHECK PRODUCT ID (UNIQUE PER USER)
========================= */
export const checkProductId = async (productId) => {
  const res = await fetch(
    `${API_URL}/check-product-id?productId=${encodeURIComponent(productId)}`,
    { headers: headers() },
  );

  return handleResponse(res);
};
