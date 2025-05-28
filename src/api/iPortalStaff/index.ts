import axios, { AxiosInstance } from "axios";
import { enviroment, fetchTimeoutServices } from "@config/environment";

const portalStaffAxiosInstance: AxiosInstance = axios.create({
  baseURL: enviroment.IPORTAL_STAFF_QUERY_PROCESS_SERVICE,
  timeout: fetchTimeoutServices,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

portalStaffAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timed out");
    }
    return Promise.reject(new Error(error.message));
  },
);

export { portalStaffAxiosInstance };
