import { useContext, useEffect } from "react";

import { IUser } from "@ptypes/app.types";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { decrypt } from "@utils/crypto/decrypt";
import { encrypt } from "@utils/crypto/encrypt";
import { useAuthRedirect } from "../authentication/useAuthRedirect";
import { usePortalData } from "../staffPortal/usePortalData";
import { useBusinessManagers } from "../staffPortal/useBusinessManagers";

const useAppData = (
  code: string | undefined,
  user: IUser,
  businessUnit: string | undefined,
) => {
  const { setBusinessUnitSigla, setAppData } = useContext(AuthAndPortalData);
  const updateAppData = () => {
    if (code) {
      localStorage.setItem("portalCode", encrypt(code));
    }

    if (businessUnit) {
      localStorage.setItem("businessUnitSigla", businessUnit);
      setBusinessUnitSigla(businessUnit);
    }

    if (user) {
      setAppData((prev) => ({
        ...prev,
        user: {
          userAccount: user.email,
          userName: user.name,
        },
      }));
    }
  };

  useEffect(() => {
    updateAppData();
  }, []);

  let hasError = false;
  let isLoading = false;
  let isAuthenticated = true;
  let errorCode = 0;

  const decryptedPortal = decrypt(localStorage.getItem("portalCode") ?? "");

  const {
    portalData,
    hasError: portalError,
    errorCode: errorCodePortal,
  } = usePortalData(decryptedPortal);
  const {
    businessManagersData,
    hasError: businessError,
    errorCode: errorCodeBusiness,
    authConfig,
    hasAuthError,
  } = useBusinessManagers(portalData);
  const {
    hasError: authError,
    isLoading: authLoading,
    isAuthenticated: authAuthenticated,
    errorCode: errorCodeAuth,
  } = useAuthRedirect(
    portalData,
    businessManagersData,
    decryptedPortal,
    authConfig,
    hasAuthError,
  );

  hasError = portalError || businessError || authError;
  errorCode = errorCodePortal || errorCodeBusiness || errorCodeAuth;
  isLoading = authLoading;
  isAuthenticated = authAuthenticated;

  return {
    hasError,
    isLoading,
    isAuthenticated,
    errorCode,
    businessManagersData,
    authConfig,
  };
};

export { useAppData };
