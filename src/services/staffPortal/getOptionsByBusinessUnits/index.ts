import { AxiosRequestConfig } from "axios";
import { portalStaffAxiosInstance } from "@api/iPortalStaff";
import { getWithRetries } from "@services/core/getWithRetries";
import { IOptionsByBusinessUnits } from "@ptypes/staffPortal/IOptionsByBusinessUnits";
import { mapOptionsByBusinessUnitsToEntities } from "./mappers";

const getOptionsByBusinessUnit = async (
  businessUnitPublicCode: string,
  staffPortalId: string,
  userAccount: string,
): Promise<IOptionsByBusinessUnits[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchOptionForStaff",
      "X-User-Name": userAccount,
    },
  };

  const queryParams = new URLSearchParams({
    portalPublicCode: staffPortalId,
    businessUnitPublicCode: businessUnitPublicCode,
  });
  const data: IOptionsByBusinessUnits[] = await getWithRetries<
    IOptionsByBusinessUnits[]
  >(portalStaffAxiosInstance, `/staffs?${queryParams.toString()}`, config);

  return mapOptionsByBusinessUnitsToEntities(data);
};

export { getOptionsByBusinessUnit };
