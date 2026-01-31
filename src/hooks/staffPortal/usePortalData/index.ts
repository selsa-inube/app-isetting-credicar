import { useState, useEffect } from "react";

import { staffPortalByBusinessManager } from "@services/staffPortal/getStaffPortalByBusinessManager";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortal/IStaffPortalByBusinessManager";
import { enviroment } from "@config/environment";

const usePortalData = (portalCode: string | null) => {
  const [portalData, setPortalData] = useState<IStaffPortalByBusinessManager>(
    {} as IStaffPortalByBusinessManager,
  );
  const [hasError, setHasError] = useState(false);
  const [errorCode, setErrorCode] = useState<number>(0);

  useEffect(() => {
    if (!portalCode) {
      setHasError(true);
      setErrorCode(1000);
      return;
    }
  }, [portalCode]);

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        if (!portalCode) {
          return;
        }

        const StaffPortalData = await staffPortalByBusinessManager(
          portalCode,
          "",
        );
        if (!StaffPortalData) {
          setHasError(true);
          setErrorCode(1001);
          return;
        }

        if (
          StaffPortalData[0].staffPortalCatalogCode !==
          enviroment.PORTAL_CATALOG_CODE
        ) {
          setHasError(true);
          setErrorCode(1002);
          return;
        }
        setPortalData(StaffPortalData[0]);
      } catch (error) {
        console.info(error);
        setHasError(true);
        setErrorCode(500);
      }
    };

    fetchPortalData();
  }, [portalCode]);

  return { portalData, hasError, errorCode };
};

export { usePortalData };
