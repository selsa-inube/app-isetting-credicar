import { errorStatusRequest } from "@config/errorStatusRequest";

const messageErrorStatusRequest = (status: number, description?: string) => {
  switch (status) {
    case 400:
      return errorStatusRequest(description).status400;
    case 404:
      return errorStatusRequest(description).status404;
    case 500:
      return errorStatusRequest(description).status500;
    case 0:
      return errorStatusRequest(description).status0;
    default:
      return errorStatusRequest(description).default;
  }
};

export { messageErrorStatusRequest };
