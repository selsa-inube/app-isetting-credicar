import { IOptionsGenDecision } from "@ptypes/hooks/generalCreditPolicies/IOptionsGenDecision";

const validateOptionVerification = (
  optionsGenDecision: IOptionsGenDecision,
  option: string,
  values: string,
) => {
  const valuesArray = values.split(",").map((value) => value.trim());
  const optionValue =
    optionsGenDecision[option as keyof typeof optionsGenDecision];

  const foundOptions = optionValue
    .filter((option) => valuesArray.includes(option.value))
    .map((option) => option.label);

  return foundOptions.join(", ");
};

export { validateOptionVerification };
