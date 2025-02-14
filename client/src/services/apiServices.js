import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1";

const getToken = () => localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export const addNote = async (note) => {
  try {
    const response = await apiClient.post("/create-note", note);
    if (response.status === 201 && response.data.note) {
      return response.data.note;
    }
    throw new Error("Failed to create note");
  } catch (error) {
    throw error.response.data;
  }
};

export const getNotes = async (currentPage, notesPerPage) => {
  try {
    const response = await apiClient.get(
      `/get-notes?page=${currentPage}&limit=${notesPerPage}`
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await apiClient.post("/register", data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const sendNotification = async (data) => {
  try {
    const response = await apiClient.post("/send-notification", data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await apiClient.post("/login", data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const googleAuth = async (data) => {
  try {
    const response = await apiClient.post("/googleauth", data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchNotes = async () => {
  try {
    const response = await apiClient.get("/get-notes");
    return response.data.notes;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateNote = async (noteId, note) => {
  try {
    const response = await apiClient.put(`/update-note/${noteId}`, note);
    return response.data.note;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await apiClient.delete(`/delete-note/${noteId}`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/get-categories");
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchNotesByCategory = async (categoryId) => {
  try {
    const response = await apiClient.post(`/get-notes-by-category`, {
      categoryId,
    });
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const addCategory = async (category) => {
  try {
    const response = await apiClient.post("/create-category", category);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await apiClient.delete(
      `/delete-category?categoryId=${categoryId}`
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateCategory = async (name, description, categoryId) => {
  try {
    const response = await apiClient.post("/update-category", {
      name,
      description,
      categoryId,
    });
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchDevices = async () => {
  try {
    const response = await apiClient.get("/get-devices");
    return response.data.devices;
  } catch (error) {
    throw error.response.data;
  }
};

export const removeDevice = async (deviceId) => {
  try {
    const response = await apiClient.get(`/remove-device?deviceId=${deviceId}`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProducts = async () => {
  try {
    const response = await apiClient.get("/get-products");
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`/delete-product/${productId}`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await apiClient.put(`/update-product/${id}`, data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const createProduct = async (data) => {
  try {
    const response = await apiClient.post("/create-product", data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await apiClient.get(`/get-product/${id}`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const getDevices = async () => {
  try {
    const response = await apiClient.get("/get-devices");
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const logoutDevice = async (deviceId) => {
  try {
    const response = await apiClient.post("/logout-device", deviceId);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get("/get-profile");
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const getNote = async ({noteId}) => {
  try {
    const response = await apiClient.get(`/get-note`, {noteId});
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await apiClient.put("/update-profile", data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await apiClient.post("/forgot-password", data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await apiClient.post("/reset-password", data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await apiClient.post("/verify-otp", data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};