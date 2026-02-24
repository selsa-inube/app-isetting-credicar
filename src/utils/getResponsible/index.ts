import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IUserManagingConfigRequests } from "@ptypes/requestInProgress/IUserConfigRequests";

const getResponsible = (data: IRequestsInProgress, user: string) => {
  const usermanaments: string[] = [];

  const userManagements = data.userManagingConfigurationRequests as
    | IUserManagingConfigRequests[]
    | [];
  const requesters = data.requester;

  if (Array.isArray(userManagements)) {
    userManagements.forEach((user) => usermanaments.push(user.userResponsible));
  }
  if (requesters) {
    usermanaments.push(requesters.identificationNumber);
  }
  return usermanaments.includes(user);
};

export { getResponsible };
