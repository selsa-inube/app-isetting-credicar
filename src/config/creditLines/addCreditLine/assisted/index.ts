import { IAssistedStep } from "@inubekit/inubekit";

import { t } from "i18next";

const addCreditLinesSteps: IAssistedStep[] = [
  {
    id: 1,
    number: 1,
    name: t("creditLines.addCreditLine.assisted.generalData"),
    description: t(
      "creditLines.addCreditLine.assisted.generalDataOfTheCreditLine",
    ),
  },
  {
    id: 2,
    number: 2,
    name: t("creditLines.addCreditLine.assisted.creditProspectOptions"),
    description: t(
      "creditLines.addCreditLine.assisted.optionsForCreatingTheCreditProspect",
    ),
  },
  {
    id: 3,
    number: 3,
    name: t("creditLines.addCreditLine.assisted.maximumAmount"),
    description: t(
      "creditLines.addCreditLine.assisted.configureMaximumAmountDecisions",
    ),
  },
  {
    id: 4,
    number: 4,
    name: t("creditLines.addCreditLine.assisted.verification"),
    description: t(
      "creditLines.addCreditLine.assisted.confirmFilledInformation",
    ),
  },
];

export { addCreditLinesSteps };
