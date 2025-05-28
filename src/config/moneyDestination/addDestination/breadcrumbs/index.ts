import "@i18n";
import { t } from "i18next";

const crumbsAddDestination = [
  {
    path: "/",
    label: t("moneyDestination.addDestination.breadcrumbs.home"),
    id: "home",
    isActive: false,
  },
  {
    path: "/money-destination",
    label: t("moneyDestination.addDestination.breadcrumbs.moneyDestination"),
    id: "moneyDestination",
    isActive: false,
  },
  {
    path: "/money-destination/add-destination",
    label: t("moneyDestination.addDestination.breadcrumbs.addDestination"),
    id: "addDestination",
    isActive: true,
  },
];
export { crumbsAddDestination };
