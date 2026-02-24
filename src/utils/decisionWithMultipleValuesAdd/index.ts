import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";

const decisionWithMultipleValues = (
  ruleName: string,
  value: string,
  dateVerification: IDateVerification,
) => {
  if (!value || value.trim() === "") {
    return [];
  }
  const values = value
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v !== "");
  if (values.length === 0) {
    return [];
  }

  return [
    {
      decisionsByRule: values.map((val) => ({
        effectiveFrom: dateVerification.date,
        value: val,
      })),
      ruleName: ruleName,
    },
  ];
};

export { decisionWithMultipleValues };
