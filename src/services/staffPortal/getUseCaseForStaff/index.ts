import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { portalStaffAxiosInstance } from "@api/iPortalStaff";
import { IGetUseCaseForStaff } from "@ptypes/staffPortal/IGetUseCaseForStaff";

const getUseCaseForStaff = async (
  businessUnit: string,
  userAccount: string,
  businessManagerCode: string,
): Promise<string[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchUseCaseForStaff",
      "X-User-Name": userAccount,
    },
  };

  const queryParams = new URLSearchParams({
    businessManagerCode: businessManagerCode,
    businessUnitCode: businessUnit,
  });

  const data: IGetUseCaseForStaff = await getWithRetries<IGetUseCaseForStaff>(
    portalStaffAxiosInstance,
    `/staffs?${queryParams.toString()}`,
    config,
  );
  return Array.isArray(data.listOfUseCases) ? data.listOfUseCases : [];
};

export { getUseCaseForStaff };
