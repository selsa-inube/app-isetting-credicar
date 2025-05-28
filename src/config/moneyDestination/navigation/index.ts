import "@i18n";
import { t } from "i18next";

const crumbsMoneyDestination = [
  {
    path: "/",
    label: t("moneyDestination.navigation.home"),
    id: "home",
    isActive: false,
  },
  {
    path: "/money-destination",
    label: t("moneyDestination.navigation.moneyDestination"),
    id: "moneyDestination",
    isActive: true,
  },
];
export { crumbsMoneyDestination };
