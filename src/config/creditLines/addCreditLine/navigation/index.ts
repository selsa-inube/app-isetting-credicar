import { t } from "i18next";

const crumbsAddCreditLines = [
  {
    path: "/",
    label: t("creditLines.addCreditLine.navigation.home"),
    id: "home",
    isActive: false,
  },
  {
    path: "/credit-lines",
    label: t("creditLines.addCreditLine.navigation.creditLine"),
    id: "creditLine",
    isActive: true,
  },
  {
    path: "/credit-lines/add-credit-line",
    label: t("creditLines.addCreditLine.navigation.addCreditLine"),
    id: "addCreditLine",
    isActive: true,
  },
];
export { crumbsAddCreditLines };
