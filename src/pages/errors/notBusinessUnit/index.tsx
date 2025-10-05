import { useIAuth } from "@inube/iauth-react";
import { ErrorPage } from "@design/layout/errorPage";
import { enviroment } from "@config/environment";
import { useClearLocalStorage } from "@hooks/authentication/useClearLocalStorage";

function NotBusinessUnit() {
  const { logout } = useIAuth();

  useClearLocalStorage();

  const handlelogout = () => {
    logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
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
