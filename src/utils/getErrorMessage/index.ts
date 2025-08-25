import { AxiosError } from "axios";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error.response?.data?.error) {
      return error.response.data.error;
    }

    if (typeof error.response?.data === "string") {
      return error.response.data;
    }

    if (error.response?.statusText) {
      return `${error.response.status}: ${error.response.statusText}`;
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Error al obtener los datos.";
};

export { getErrorMessage };
