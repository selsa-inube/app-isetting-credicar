import { addDestinationStepsConfig } from "@config/moneyDestination/addDestination/assisted";

const stepKeyByNameMoney = Object.fromEntries(
  addDestinationStepsConfig.map((step) => [step.name, step.number]),
);

export { stepKeyByNameMoney };
