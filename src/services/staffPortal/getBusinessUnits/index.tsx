import { AxiosRequestConfig } from "axios";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortal/IBusinessUnitsPortalStaff";
import { getWithRetries } from "@services/core/getWithRetries";
import { portalStaffAxiosInstance } from "@api/iPortalStaff";
import { mapBusinessUnitsPortalStaffToEntities } from "./mappers";

const getBusinessUnitsPortalStaff = async (
  portalPublicCode: string,
  userAccount: string,
  token: string,
): Promise<IBusinessUnitsPortalStaff[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchBusinessUnitsForAnOfficer",
      Authorization: token,
    },
  };
  const data: IBusinessUnitsPortalStaff[] = await getWithRetries<
    IBusinessUnitsPortalStaff[]
  >(
    portalStaffAxiosInstance,
    `/business-units-portal-staff/${userAccount}/${portalPublicCode}`,
    config,
  );
  return Array.isArray(data) ? mapBusinessUnitsPortalStaffToEntities(data) : [];
};

export { getBusinessUnitsPortalStaff };
