import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortal/IBusinessUnitsPortalStaff";
import { getBusinessUnitsPortalStaff } from "@services/staffPortal/getBusinessUnits";

const validateBusinessUnities = async (
  publicCode: string,
  userAccount: string,
  token: string,
): Promise<IBusinessUnitsPortalStaff[]> => {
  const newData = await getBusinessUnitsPortalStaff(
    publicCode,
    userAccount,
    token,
  );

  return newData;
};

export { validateBusinessUnities };
