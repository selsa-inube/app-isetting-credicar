import { MdOutlineReportProblem } from "react-icons/md";
import { ComponentAppearance } from "@enum/appearances";

const generalPoliciesTabsConfig = (smallScreen: boolean) => {
  return {
    generalPolicies: {
      id: "generalPolicies",
      isDisabled: false,
      label: smallScreen ? "Edición" : "Edición de políticas generales",
    },
    requestsInProgress: {
      id: "requestsInProgress",
      isDisabled: false,
      label: smallScreen
        ? "Politicas en trámite"
        : "Politicas generales en trámite",

      icon: {
        icon: <MdOutlineReportProblem />,
        appearance: ComponentAppearance.WARNING,
      },
    },
  };
};

export { generalPoliciesTabsConfig };
