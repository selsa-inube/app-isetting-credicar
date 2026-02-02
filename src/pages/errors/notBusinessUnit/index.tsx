import { useIAuth } from "@inube/iauth-react";
import { useClearLocalStorage } from "@hooks/authentication/useClearLocalStorage";
import { ErrorPage } from "@design/layout/errorPage";

function NotBusinessUnit() {
  const { logout } = useIAuth();

  useClearLocalStorage();

  const handlelogout = (redirect?: string) => {
    logout({ logoutParams: { returnTo: window.location.origin + redirect } });
  };

  return (
    <ErrorPage
      errorCode={1004}
      heading="No hay resultados..."
      onClick={handlelogout}
    />
  );
}

export { NotBusinessUnit };
