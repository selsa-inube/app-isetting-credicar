import { useIAuth } from "@inube/iauth-react";
import { Home } from "@pages/home";

const Logout = () => {
  const redirect_uri = window.location.origin;
  localStorage.clear();
  const { logout } = useIAuth();
  logout({ logoutParams: { returnTo: redirect_uri } });
  return <Home />;
};

export { Logout };
