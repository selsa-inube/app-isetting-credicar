import { errorStatusServices } from "@config/errorStatusServices";

const messageErrorStatusConsultation = (status: number) => {
  switch (status) {
    case 400:
      return errorStatusServices.status400;
    case 500:
      return errorStatusServices.status500;
    case 0:
      return errorStatusServices.status0;
    default:
      return errorStatusServices.default;
  }
};

export { messageErrorStatusConsultation };
