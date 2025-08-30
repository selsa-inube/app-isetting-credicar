import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { maxRetriesServices } from "@config/environment";

const getWithRetries = async <T>(
  axiosInstance: AxiosInstance,
  url: string,
  config: AxiosRequestConfig,
): Promise<T> => {
  const maxRetries = maxRetriesServices;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get<T>(
        url,
        config,
      );
      return response.data;
    } catch (error) {
      lastError = error;
      if (error instanceof Error) {
        console.error(`Attempt ${attempt} failed: ${error.message}`);
      } else {
        console.error(`Attempt ${attempt} failed: ${String(error)}`);
      }

      if (attempt === maxRetries) {
        break;
      }
    }
  }
  throw new Error(lastError as string);
};

export { getWithRetries };
