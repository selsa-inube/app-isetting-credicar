import { useIAuth } from "@inube/iauth-react";

const Logout = () => {
  const keysToRemove = [
    "businessUnitSigla",
    "businessUnitsToTheStaff",
    "useCasesByStaff",
  ];
  keysToRemove.forEach((key) => localStorage.removeItem(key));
  const { logout } = useIAuth();
  logout();
  return null;
};

export { Logout };
