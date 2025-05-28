import axios, { AxiosInstance } from "axios";
import { enviroment, fetchTimeoutServices } from "@config/environment";

const credicarAxiosInstance: AxiosInstance = axios.create({
  baseURL: enviroment.ISETTING_CREDICAR_QUERY_PROCESS_SERVICE,
  timeout: fetchTimeoutServices,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

credicarAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timed out");
    }
    return Promise.reject(new Error(error.message));
  },
);

export { credicarAxiosInstance };
