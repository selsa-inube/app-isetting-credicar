import { MdOutlineReportProblem } from "react-icons/md";
import { EComponentAppearance } from "@enum/appearances";

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
      icon: {
        icon: <MdOutlineReportProblem />,
        appearance: EComponentAppearance.WARNING,
      },
    },
  };
};

export { moneyDestinationTabsConfig };
