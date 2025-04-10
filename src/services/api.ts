import axios from "axios";

const API_KEY = process.env.VITE_API_KEY;
const BASE_URL = process.env.VITE_BASE_URL;

const apiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY
    }
})

export default apiClient;



