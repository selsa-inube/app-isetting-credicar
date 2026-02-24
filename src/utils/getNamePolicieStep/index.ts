import { addGenCredPoliciesSteps } from "@config/generalCreditPolicies/assisted/steps";

const getNamePolicieStep = (step: number) => {
  return addGenCredPoliciesSteps.find((item) => item.number === step)?.name;
};

export { getNamePolicieStep };
