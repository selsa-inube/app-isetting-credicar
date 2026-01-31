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
  hasAuthError: boolean,
) => {
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useIAuth();
  const [hasError, setHasError] = useState(false);
  const [errorCode, setErrorCode] = useState<number>(0);
  const { signOut } = useSignOut();

  if (error) {
    signOut("/error?code=1009");
  }

  useEffect(() => {
    const isLogoutRoute = window.location.pathname === "/logout";
    if (portalPublicCode.abbreviatedName) {
      if (
        businessManagersData &&
        !isLoading &&
        !isAuthenticated &&
        !hasAuthError &&
        authConfig &&
        !isLogoutRoute
      ) {
        loginWithRedirect();
      }
    } else {
      setHasError(true);
      setErrorCode(1001);
    }
  }, [
    portalPublicCode,
    businessManagersData,
    isLoading,
    authConfig,
    isAuthenticated,
    loginWithRedirect,
    portalCode,
  ]);

  return { hasError, isLoading, isAuthenticated, errorCode };
};

export { useAuthRedirect };
