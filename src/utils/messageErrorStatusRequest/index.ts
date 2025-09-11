import { errorStatusRequest } from "@config/errorStatusRequest";

const messageErrorStatusRequest = (status: number) => {
  switch (status) {
    case 400:
      return errorStatusRequest.status400;
    case 500:
      return errorStatusRequest.status500;
    case 0:
      return errorStatusRequest.status0;
    default:
      return errorStatusRequest.default;
  }
};

export { messageErrorStatusRequest };
