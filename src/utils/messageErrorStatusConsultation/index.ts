import { errorStatusServices } from "@config/errorStatusServices";

const messageErrorStatusConsultation = (
  status: number,
  description: string,
) => {
  switch (status) {
    case 400:
      return errorStatusServices(description).status400;
    case 404:
      return errorStatusServices(description).status404;
    case 500:
      return errorStatusServices(description).status500;
    case 0:
      return errorStatusServices(description).status0;
    default:
      return errorStatusServices(description).default;
  }
};

export { messageErrorStatusConsultation };
