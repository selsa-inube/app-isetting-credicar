import { IAssistedStep } from "@inubekit/inubekit";
import { t } from "i18next";

const addDestinationStepsConfig = (nameDescription: string) => {
  const addDestinationSteps: IAssistedStep[] = [
    {
      id: 1,
      number: 1,
      name: t("moneyDestination.addDestination.assisted.generalData"),
      description: t(
        "moneyDestination.addDestination.assisted.generalDataDescription",
      ),
    },
    {
      id: 2,
      number: 2,
      name: t("moneyDestination.addDestination.assisted.creditProspectOptions"),
      description: `Agregar decisión para ${nameDescription}.`,
    },
    {
      id: 3,
      number: 3,
      name: t("moneyDestination.addDestination.assisted.maximumAmount"),
      description: t(
        "moneyDestination.addDestination.assisted.configureMaximumAmountDecisions",
      ),
    },
  ];
  return addDestinationSteps;
};

export { addDestinationStepsConfig };
