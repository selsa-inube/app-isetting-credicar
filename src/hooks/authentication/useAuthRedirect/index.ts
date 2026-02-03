import { useEffect, useState } from "react";
import { useIAuth } from "@inube/iauth-react";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortal/IStaffPortalByBusinessManager";
import { IBusinessManagers } from "@ptypes/staffPortal/IBusinessManagers";
import { IAuthConfig } from "@ptypes/IAuthConfig";
import { useSignOut } from "../useSignOut";

const useAuthRedirect = (
  portalPublicCode: IStaffPortalByBusinessManager,
  businessManagersData: IBusinessManagers,
  portalCode: string | null,
  authConfig: IAuthConfig | null,
  loadingPortalData: boolean,
  loadingBusinessManagers: boolean,
) => {
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useIAuth();
  const [hasError, setHasError] = useState(false);
  const [errorCode, setErrorCode] = useState<number>(0);
  const { signOut } = useSignOut();

  useEffect(() => {
    if (error) {
      signOut("/error?code=1009");
    }
  }, [error, signOut]);

  useEffect(() => {
    const isLogoutRoute = window.location.pathname === "/logout";

    if (isLogoutRoute) {
      return;
    }

    const isLoadingData =
      loadingPortalData || loadingBusinessManagers || isLoading;

    if (isLoadingData) {
      if (hasError) {
        setHasError(false);
        setErrorCode(0);
      }
      return;
    }

    if (!portalPublicCode.abbreviatedName) {
      setHasError(true);
      setErrorCode(1001);
      return;
    }

    if (!authConfig) {
      setHasError(true);
      setErrorCode(1006);
      return;
    }

    if (hasError) {
      setHasError(false);
      setErrorCode(0);
    }

    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [
    portalPublicCode,
    businessManagersData,
    isLoading,
    authConfig,
    isAuthenticated,
    loginWithRedirect,
    portalCode,
    loadingPortalData,
    loadingBusinessManagers,
    hasError,
  ]);

  const isLoadingGlobal =
    loadingPortalData || loadingBusinessManagers || isLoading;

  return {
    hasError,
    isLoading: isLoadingGlobal,
    isAuthenticated,
    errorCode,
  };
};

export { useAuthRedirect };
