import { toggleDecisionsLabels } from "@config/generalCreditPolicies/assisted/toggleDecisionsLabels";

const renderValue = (value: boolean) => {
  return value === true ? toggleDecisionsLabels.yes : toggleDecisionsLabels.no;
};

export { renderValue };
