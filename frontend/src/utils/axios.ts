import axios from 'axios';
import environment from 'environment';

const api = axios.create({
  baseURL: environment.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
