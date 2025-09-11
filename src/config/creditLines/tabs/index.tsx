import { MdOutlineConstruction, MdOutlineReportProblem } from "react-icons/md";
import { EComponentAppearance } from "@enum/appearances";

const creditLinesTabsConfig = {
  creditLines: {
    id: "creditLines",
    isDisabled: false,
    label: "Líneas de vigentes",
  },
  requestsInProgress: {
    id: "requestsInProgress",
    isDisabled: false,
    label: "Líneas en tramite",
    icon: {
      icon: <MdOutlineReportProblem />,
      appearance: EComponentAppearance.WARNING,
    },
  },
  linesUnderConstruction: {
    id: "linesUnderConstruction",
    isDisabled: false,
    label: "Líneas en construcción",
    icon: {
      icon: <MdOutlineConstruction />,
      appearance: EComponentAppearance.WARNING,
    },
  },
};

export { creditLinesTabsConfig };
