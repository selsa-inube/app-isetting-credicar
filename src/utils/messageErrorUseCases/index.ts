import { errorStatusUseCases } from "@config/errorStatusUseCases";

const messageErrorUseCases = (
  status: number,
  useCase: string,
  option: string,
  description: string,
) => {
  switch (status) {
    case 400:
      return errorStatusUseCases(useCase, option, description).status400;
    case 404:
      return errorStatusUseCases(useCase, option, description).status404;
    case 500:
      return errorStatusUseCases(useCase, option, description).status500;
    case 0:
      return errorStatusUseCases(useCase, option, description).status0;
    default:
      return errorStatusUseCases(useCase, option, description).default;
  }
};

export { messageErrorUseCases };
