import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_URL } from "./api";

const appAxios = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

appAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      const token = "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";
      if (token) config.headers.Authorization = token ?`Bearer ${token}`: "";
    }
    return config;
  },
  (error: AxiosError) => {
    if (error.response?.status == 503) {
      window.location.href = "/maintain";
      return;
    }
    if (error.response?.status == 401) {
      window.location.href = "/login";
      return;
    }
    if (error.response?.status == 429) {
      return;
    }

    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status == 503) {
      window.location.href = "/503";
      return;
    }
    if (error.response?.status == 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }
    if (error.response?.status == 429) {
      return;
    }

    return Promise.reject(error);
  }
);

export default appAxios;
