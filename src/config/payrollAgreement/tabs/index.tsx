import { MdOutlineReportProblem } from "react-icons/md";
import { EComponentAppearance } from "@enum/appearances";

const payrollAgreementTabsConfig = (smallScreen: boolean) => {
  return {
    payrollAgreement: {
      id: "payrollAgreement",
      isDisabled: false,
      label: smallScreen ? "Vigentes" : "Nóminas de convenio",
    },
    requestsInProgress: {
      id: "requestsInProgress",
      isDisabled: false,
      label: smallScreen ? `En trámite` : "Nóminas de convenio en trámite",
      icon: {
        icon: <MdOutlineReportProblem />,
        appearance: EComponentAppearance.WARNING,
      },
    },
  };
};

export { payrollAgreementTabsConfig };
