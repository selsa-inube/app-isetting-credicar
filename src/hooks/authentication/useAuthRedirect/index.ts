import { useEffect, useState } from "react";

import { IStaffPortalByBusinessManager } from "@ptypes/staffPortal/IStaffPortalByBusinessManager";
import { IBusinessManagers } from "@ptypes/staffPortal/IBusinessManagers";
import { useIAuth } from "@inube/iauth-react";

const useAuthRedirect = (
  portalPublicCode: IStaffPortalByBusinessManager,
  businessManagersData: IBusinessManagers,
  portalCode: string | null,
) => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useIAuth();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorCode, setErrorCode] = useState<number>(0);

  useEffect(() => {
    if (hasRedirected) return;

    if (portalPublicCode.abbreviatedName) {
      if (businessManagersData && !isLoading && !isAuthenticated) {
        loginWithRedirect();
      } else if (isAuthenticated) {
        setHasRedirected(true);
      } else {
        setHasError(true);
        setErrorCode(1001);
      }
    } else {
      setHasError(true);
      setErrorCode(1001);
    }
  }, [
    portalPublicCode,
    businessManagersData,
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    hasRedirected,
    portalCode,
  ]);

  return { hasRedirected, hasError, isLoading, isAuthenticated, errorCode };
};

export { useAuthRedirect };
