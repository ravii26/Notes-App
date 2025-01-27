import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

const getToken = () => localStorage.getItem('token');

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export const addNote = async (note) => {
    try {
        const response = await apiClient.post('/create-note', note);
        if(response.status === 201 && response.data.note) {
            return response.data.note
        }
        throw new Error('Failed to create note');
    } catch (error) {
        throw error.response.data;
    }
};

export const registerUser = async (data) => {
    try {
        const response = await apiClient.post('/register', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (data) => {
    try {
        const response = await apiClient.post('/login', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchNotes = async () => {
    try {
        const response = await apiClient.get('/get-notes');
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
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await apiClient.get('/get-categories');
        return response.data.categories;
    } catch (error) {
        throw error.response.data;
    }
};

export const addCategory = async (category) => {
    try {
        const response = await apiClient.post('/create-category', category);
        return response.data.category;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const response = await apiClient.delete(`/delete-category?categoryId=${categoryId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchDevices = async () => {
    try {
        const response = await apiClient.get('/get-devices');
        return response.data.devices;
    } catch (error) {
        throw error.response.data;
    }
};

export const removeDevice = async (deviceId) => {
    try {
        const response = await apiClient.get(`/remove-device?deviceId=${deviceId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await apiClient.get('/get-products');
        return response.data.products;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await apiClient.delete(`/delete-product/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};