import { IRequestSteps } from "@src/types/design/IRequestSteps";

const countVerifiedRequests = (requests: IRequestSteps[]) => {
  const countVerified = requests.filter(
    (request) => request.status === "completed" || request.status === "error",
  ).length;
  return (countVerified * 100) / requests.length;
};

export { countVerifiedRequests };
