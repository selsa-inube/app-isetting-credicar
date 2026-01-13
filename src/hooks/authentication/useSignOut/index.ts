import { useIAuth } from "@inube/iauth-react";
import { enviroment } from "@config/environment";

export const useSignOut = () => {
  const { logout } = useIAuth();

  const signOut = (redirect?: string) => {
    const keysToRemove = [
      "businessUnitSigla",
      "businessUnitsToTheStaff",
      "useCasesByStaff",
      "portalCode",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    if (!redirect) {
      logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
    } else {
      logout({ logoutParams: { returnTo: window.location.origin + redirect } });
    }
    return null;
  };

  return { signOut };
};
