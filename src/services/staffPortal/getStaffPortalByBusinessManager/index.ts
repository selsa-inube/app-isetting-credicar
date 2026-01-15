import { AxiosRequestConfig } from "axios";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortal/IStaffPortalByBusinessManager";
import { getWithRetries } from "@services/core/getWithRetries";
import { isaasQueryAxiosInstance } from "@api/isaasQuery";
import { mapStaffPortalByBusinessManagerApiToEntities } from "./mappers";

const staffPortalByBusinessManager = async (
  portalCode: string,
  token: string,
): Promise<IStaffPortalByBusinessManager[]> => {
  const queryParams = new URLSearchParams({
    staffPortalId: portalCode,
  });
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllStaffPortalsByBusinessManager",
      Authorization: token,
    },
  };
  const data: IStaffPortalByBusinessManager[] = await getWithRetries<
    IStaffPortalByBusinessManager[]
  >(
    isaasQueryAxiosInstance,
    `/staff-portals-by-business-manager?${queryParams.toString()}`,
    config,
  );

  return mapStaffPortalByBusinessManagerApiToEntities(data);
};

export { staffPortalByBusinessManager };
