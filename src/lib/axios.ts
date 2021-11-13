import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const getNewAccessToken = async () => {
  const res = await api.post("/auth/token");
  return res.data;
};

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      await getNewAccessToken();
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
export default api;
