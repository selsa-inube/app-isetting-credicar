import axios, { AxiosInstance } from "axios";
import { enviroment, fetchTimeoutServices } from "@config/environment";

const isaasPerAxiosInstance: AxiosInstance = axios.create({
  baseURL: enviroment.ISETTING_PERSISTENCE_PROCESS_SERVICE,
  timeout: fetchTimeoutServices,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

isaasPerAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timed out");
    }
    const messageError = {
      code: error.code,
      description: error.message,
      status: error.request.status,
      response: error.request.response,
    };

    return Promise.reject(new Error(JSON.stringify(messageError)));
  },
);

export { isaasPerAxiosInstance };
