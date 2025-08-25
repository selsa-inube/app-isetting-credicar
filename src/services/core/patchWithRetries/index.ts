import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getErrorMessage } from "@utils/getErrorMessage";
import { maxRetriesPost } from "@config/environment";

const patchWithRetries = async <T>(
  url: string,
  config: AxiosRequestConfig,
  data: string[],
  axiosInstance: AxiosInstance,
): Promise<T> => {
  const maxRetries = maxRetriesPost;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response: AxiosResponse<T> = await axiosInstance.patch<T>(
        url,
        data,
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

  const errorMessage = getErrorMessage(lastError);
  throw new Error(errorMessage);
};

export { patchWithRetries };
