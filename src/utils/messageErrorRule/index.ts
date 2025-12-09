import { errorStatusEvaluateRule } from "@config/errorEvaluateRule";

const messageErrorEvaluateRule = (status: number, description?: string) => {
  switch (status) {
    case 400:
      return errorStatusEvaluateRule(description).status400;
    case 404:
      return errorStatusEvaluateRule(description).status404;
    case 500:
      return errorStatusEvaluateRule(description).status500;
    case 0:
      return errorStatusEvaluateRule(description).status0;
    default:
      return errorStatusEvaluateRule(description).default;
  }
};

export { messageErrorEvaluateRule };
