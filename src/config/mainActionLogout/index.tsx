import { MdLogout } from "react-icons/md";
import { useIAuth } from "@inube/iauth-react";

const actionsConfig = (redirect?: string) => {
  const { logout } = useIAuth();
  const actions = [
    {
      id: "logout",
      label: "Cerrar sesión",
      icon: <MdLogout />,
      action: () => {
        try {
          logout({
            logoutParams: { returnTo: window.location.origin + redirect },
          });
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    },
  ];

  return actions;
};

export { actionsConfig };
