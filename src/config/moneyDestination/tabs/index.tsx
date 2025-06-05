import { MdOutlineReportProblem } from "react-icons/md";
import { ComponentAppearance } from "@enum/appearances";

const moneyDestinationTabsConfig = (smallScreen: boolean) => {
  return {
    moneyDestination: {
      id: "moneyDestination",
      isDisabled: false,
      label: "Destinos de dinero",
    },
    requestsInProgress: {
      id: "requestsInProgress",
      isDisabled: false,
      label: smallScreen ? "En trámite" : "Solicitudes en trámite",
      notificationIndicators: 2,
      icon: {
        icon: <MdOutlineReportProblem />,
        appearance: ComponentAppearance.WARNING,
      },
    },
  };
};

export { moneyDestinationTabsConfig };
