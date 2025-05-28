import "@i18n";
import { t } from "i18next";

const moneyDestinationTabsConfig = {
  moneyDestination: {
    id: "moneyDestination",
    isDisabled: false,
    label: t("moneyDestination.tabs.moneyDestination"),
    buttonLabel: t("moneyDestination.tabs.buttonLabel.addMoneyDestination"),
    placeholder: t("moneyDestination.tabs.searchInput.placeholder"),
  },
  requestsInProgress: {
    id: "requestsInProgress",
    isDisabled: false,
    label: t("moneyDestination.tabs.requestsInProgress"),
    notificationIndicators: 2,
  },
};

export { moneyDestinationTabsConfig };
