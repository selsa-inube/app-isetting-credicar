import { useIAuth } from "@inube/iauth-react";

export const useSignOut = () => {
  const { logout } = useIAuth();

  const signOut = (redirect?: string) => {
    const keysToRemove = [
      "businessUnitSigla",
      "businessUnitsToTheStaff",
      "useCasesByStaff",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    if (!redirect) {
      logout();
    } else {
      logout({ logoutParams: { returnTo: window.location.origin + redirect } });
    }
    return null;
  };

  return { signOut };
};
