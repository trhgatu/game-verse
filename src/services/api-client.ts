import axios from 'axios';

const API_KEY = 'bc9404c855a64b3f80a09b8c4e200853';
const BASE_URL = 'https://api.rawg.io/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export default apiClient;