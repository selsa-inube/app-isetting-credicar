import { addGenCredPoliciesSteps } from "@config/generalCreditPolicies/assisted/steps";

const stepKeyByNamePolicies = Object.fromEntries(
  addGenCredPoliciesSteps.map((step) => [step.name, step.number]),
);

export { stepKeyByNamePolicies };
