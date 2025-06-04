import { IRequestSteps } from "@ptypes/design/IRequestSteps";

const verifiedErrorRequest = (requests: IRequestSteps[]): boolean => {
  return requests.find((request) => request.status === "error") ? true : false;
};

export { verifiedErrorRequest };
