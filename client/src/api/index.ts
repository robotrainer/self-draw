import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});

// * получение динамического baseURL сервера из конфигурационного файла public/config.json
axiosInstance.interceptors.request.use(async (config) => {
  await axios.get('config.json').then((res) => config.baseURL = res.data.urlBackendServer);
  return config;
})

export default axiosInstance;
