import { AxiosRequestConfig } from "axios";

import { getWithRetries } from "@services/core/getWithRetries";
import { isaasQueryAxiosInstance } from "@api/isaasQuery";
import { IOptionsByBusinessUnits } from "@ptypes/staffPortal/IOptionsByBusinessUnits";
import { mapOptionsByBusinessUnitsToEntities } from "./mappers";

const getOptionsByBusinessUnit = async (
  businessUnitPublicCode: string,
  staffPortalId: string,
): Promise<IOptionsByBusinessUnits[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchOptionsStaffPortalByBusinessUnit",
    },
  };

  const queryParams = new URLSearchParams({
    staffPortalId: staffPortalId,
    businessUnitPublicCode: businessUnitPublicCode,
  });
  const data: IOptionsByBusinessUnits[] = await getWithRetries<
    IOptionsByBusinessUnits[]
  >(
    isaasQueryAxiosInstance,
    `/staff-portals-by-business-manager?${queryParams.toString()}`,
    config,
  );

  return Array.isArray(data) ? mapOptionsByBusinessUnitsToEntities(data) : [];
};

export { getOptionsByBusinessUnit };
