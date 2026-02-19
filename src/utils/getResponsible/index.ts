import { IApplicantData } from "@src/types/requestInProgress/IApplicantData";
import { IRequestsInProgress } from "@src/types/requestInProgress/IRequestsInProgress";
import { IUserManagingConfigRequests } from "@src/types/requestInProgress/IUserConfigRequests";

const getResponsible = (data: IRequestsInProgress, user: string) => {
  const usermanaments: string[] = [];

  const userManagements = data.userManagingConfigurationRequests as
    | IUserManagingConfigRequests[]
    | undefined;
  const applicants = data.applicantData as IApplicantData[] | undefined;

  if (Array.isArray(userManagements)) {
    userManagements.forEach((user) => usermanaments.push(user.userResponsible));
  }
  if (Array.isArray(applicants)) {
    applicants.forEach((applicant) => usermanaments.push(applicant.name));
  }
  return usermanaments.includes(user);
};

export { getResponsible };
