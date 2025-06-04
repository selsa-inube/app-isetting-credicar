import { IRequestSteps } from "@ptypes/design/IRequestSteps";

const lastCompletedIndex = (requestSteps: IRequestSteps[]) => {
  return requestSteps.reduce((lastIndex, current, index) => {
    return current.status === "completed" || current.status === "error"
      ? index
      : lastIndex;
  }, 0);
};

export { lastCompletedIndex };
