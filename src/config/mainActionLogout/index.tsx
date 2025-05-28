import { MdLogout } from "react-icons/md";
import { enviroment } from "../environment";
import "@i18n";
import { t } from "i18next";

const actionsConfig = (logout: () => void) => {
  const actions = [
    {
      id: "logout",
      label: t("mainMenuNavigation.logout"),
      icon: <MdLogout />,
      action: () => {
        logout();
        window.location.href = enviroment.REDIRECT_URI;
      },
    },
  ];

  return actions;
};

export { actionsConfig };
