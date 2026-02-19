import { IRequester } from "@ptypes/requestInProgress/IRequester";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IUserManagingConfigRequests } from "@ptypes/requestInProgress/IUserConfigRequests";

const getResponsible = (data: IRequestsInProgress, user: string) => {
  const usermanaments: string[] = [];

  const userManagements = data.userManagingConfigurationRequests as
    | IUserManagingConfigRequests[]
    | undefined;
  const requesters = data.requester as IRequester[] | undefined;

  if (Array.isArray(userManagements)) {
    userManagements.forEach((user) => usermanaments.push(user.userResponsible));
  }
  if (Array.isArray(requesters)) {
    requesters.forEach((requester) =>
      usermanaments.push(requester.identificationNumber),
    );
  }
  return usermanaments.includes(user);
};

export { getResponsible };
