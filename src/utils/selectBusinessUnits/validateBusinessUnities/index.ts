import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortal/IBusinessUnitsPortalStaff";
import { getBusinessUnitsPortalStaff } from "@services/staffPortal/getBusinessUnits";

const validateBusinessUnities = async (
  publicCode: string,
  userAccount: string,
): Promise<IBusinessUnitsPortalStaff[]> => {
  const newData = await getBusinessUnitsPortalStaff(publicCode, userAccount);

  return newData;
};

export { validateBusinessUnities };
