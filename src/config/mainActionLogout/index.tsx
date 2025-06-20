import { MdLogout } from "react-icons/md";
import { enviroment } from "../environment";
import { useAuth0 } from "@auth0/auth0-react";

const actionsConfig = () => {
  const { logout } = useAuth0();
  const actions = [
    {
      id: "logout",
      label: "Cerrar sesión",
      icon: <MdLogout />,
      action: () => {
        logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } }).catch(
          (err) => {
            console.error("Logout failed:", err);
          },
        );
      },
    },
  ];

  return actions;
};

export { actionsConfig };
