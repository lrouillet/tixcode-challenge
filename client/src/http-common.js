import axios from 'axios';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Crear instancia
  let instance = axios.create(defaultOptions);

  // Setear token para cualquier request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();