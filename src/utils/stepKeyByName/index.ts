import { addPayrollAgreementSteps } from "@config/payrollAgreement/payrollAgreementTab/assisted/steps";

const stepKeyByName = Object.fromEntries(
  addPayrollAgreementSteps.map((step) => [step.name, step.number]),
);

export { stepKeyByName };
