import { useState, useEffect } from "react";
import { getBusinessManagers } from "@services/staffPortal/getBusinessManager";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortal/IStaffPortalByBusinessManager";
import { IBusinessManagers } from "@ptypes/staffPortal/IBusinessManagers";

const useBusinessManagers = (
  portalPublicCode: IStaffPortalByBusinessManager,
) => {
  const [businessManagersData, setBusinessManagersData] =
    useState<IBusinessManagers>({} as IBusinessManagers);
  const [hasError, setHasError] = useState(false);
  const [errorCode, setErrorCode] = useState<number>(0);

  useEffect(() => {
    const fetchBusinessManagers = async () => {
      if (!portalPublicCode) {
        setHasError(true);
        setErrorCode(1000);
        return;
      }
      try {
        if (
          portalPublicCode.businessManagerCode &&
          portalPublicCode.businessManagerCode.length > 0
        ) {
          const newData = await getBusinessManagers(
            portalPublicCode.businessManagerCode,
          );
          setBusinessManagersData(newData);
        }
      } catch (error) {
        console.info(error);
        setHasError(true);
        setErrorCode(500);
      }
    };

    fetchBusinessManagers();
  }, [portalPublicCode]);

  return { businessManagersData, hasError, errorCode };
};

export { useBusinessManagers };
