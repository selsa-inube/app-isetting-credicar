import { useState, useEffect } from "react";

import { staffPortalByBusinessManager } from "@services/staffPortal/getStaffPortalByBusinessManager";
import { enviroment } from "@config/environment";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortal/IStaffPortalByBusinessManager";

const usePortalData = (portalCode: string | null) => {
  const [portalData, setPortalData] = useState<IStaffPortalByBusinessManager>(
    {} as IStaffPortalByBusinessManager,
  );
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!portalCode) {
      setHasError(true);
      setErrorCode(1000);
      return;
    }
  }, [portalCode]);

  useEffect(() => {
    const fetchPortalData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchPortalData();
  }, [portalCode]);

  return { portalData, hasError, errorCode, loading };
};

export { usePortalData };
