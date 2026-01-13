import { useIAuth } from "@inube/iauth-react";
import { Home } from "@pages/home";

const Logout = () => {
  const redirect_uri = window.location.origin;
  const keysToRemove = [
    "businessUnitSigla",
    "businessUnitsToTheStaff",
    "useCasesByStaff",
    "portalCode",
  ];
  keysToRemove.forEach((key) => localStorage.removeItem(key));
  const { logout } = useIAuth();
  logout({ logoutParams: { returnTo: redirect_uri } });
  return <Home />;
};

export { Logout };
