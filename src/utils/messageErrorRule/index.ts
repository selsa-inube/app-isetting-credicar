import { errorStatusEvaluateRule } from "@config/errorEvaluateRule";

const messageErrorEvaluateRule = (status: number) => {
  switch (status) {
    case 400:
      return errorStatusEvaluateRule.status400;
    case 404:
      return errorStatusEvaluateRule.status404;
    case 500:
      return errorStatusEvaluateRule.status500;
    case 0:
      return errorStatusEvaluateRule.status0;
    default:
      return errorStatusEvaluateRule.default;
  }
};

export { messageErrorEvaluateRule };
