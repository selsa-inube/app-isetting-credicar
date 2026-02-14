import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { getDecisionIdMethods } from "../decisions/getDecisionIdMethods";

const decisionWithMultipleValuesEdit = (
  ruleName: string,
  value: string,
  prevValue: string,
  transactionOperation: string,
  data?: IRuleDecisionExtended[],
) => {
  if (prevValue === value) {
    return undefined;
  }

  if (!value || value.trim() === "") {
    return undefined;
  }

  const values = value
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v !== "");

  if (values.length === 0) {
    return undefined;
  }

  const decisionsByRule = values.map((val) => {
    return {
      value: val,
      effectiveFrom: String(new Date().toISOString()),
      decisionId: getDecisionIdMethods(data, val),
      transactionOperation: transactionOperation,
    };
  });

  return {
    ruleName: ruleName,
    decisionsByRule: decisionsByRule,
    modifyJustification: `${decisionsLabels.modifyJustification}${ruleName}`,
  };
};

export { decisionWithMultipleValuesEdit };
