import { useState, useEffect } from "react";
import { getBusinessManagers } from "@services/staffPortal/getBusinessManager";
import { storeEncryptedData } from "@utils/storeEncryptedData";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortal/IStaffPortalByBusinessManager";
import { IBusinessManagers } from "@ptypes/staffPortal/IBusinessManagers";
import { IAuthConfig } from "@ptypes/IAuthConfig";

const useBusinessManagers = (
  portalPublicCode: IStaffPortalByBusinessManager,
) => {
  const [businessManagersData, setBusinessManagersData] =
    useState<IBusinessManagers>({} as IBusinessManagers);
  const [hasError, setHasError] = useState(false);
  const [errorCode, setErrorCode] = useState<number>(0);
  const [authConfig, setAuthConfig] = useState<IAuthConfig | null>(null);

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
            "",
          );

          storeEncryptedData({
            originatorId: newData.clientId,
            originatorCode: newData.publicCode,
            aplicationName: portalPublicCode.publicCode,
          });

          setBusinessManagersData(newData);
          if (newData.clientId && newData.clientSecret) {
            setAuthConfig({
              clientId: newData.clientId,
              clientSecret: newData.clientSecret,
            });
          }
        }
      } catch (error) {
        console.info(error);
        setHasError(true);
        setErrorCode(500);
      }
    };

    fetchBusinessManagers();
  }, [portalPublicCode]);

  const hasAuthError = !authConfig || Boolean(errorCode);

  return {
    businessManagersData,
    hasError,
    errorCode,
    authConfig,
    hasAuthError,
  };
};

export { useBusinessManagers };
