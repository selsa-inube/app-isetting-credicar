import { MdLogout } from "react-icons/md";
import { useIAuth } from "@inube/iauth-react";
import { enviroment } from "../environment";

const actionsConfig = () => {
  const { logout } = useIAuth();
  const actions = [
    {
      id: "logout",
      label: "Cerrar sesión",
      icon: <MdLogout />,
      action: () => {
        try {
          logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    },
  ];

  return actions;
};

export { actionsConfig };
