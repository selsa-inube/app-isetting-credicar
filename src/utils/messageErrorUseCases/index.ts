import { errorStatusUseCases } from "@config/errorStatusUseCases";

const messageErrorUseCases = (
  status: number,
  useCase: string,
  option: string,
) => {
  switch (status) {
    case 400:
      return errorStatusUseCases(useCase, option).status400;
    case 404:
      return errorStatusUseCases(useCase, option).status404;
    case 500:
      return errorStatusUseCases(useCase, option).status500;
    case 0:
      return errorStatusUseCases(useCase, option).status0;
    default:
      return errorStatusUseCases(useCase, option).default;
  }
};

export { messageErrorUseCases };
