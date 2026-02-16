import { EBooleanText } from "@enum/booleanText";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDate } from "../date/formatDate";
import { getDecisionIdMethods } from "../decisions/getDecisionIdMethods";

const decisionWithoutConditions = (
  ruleName: string,
  value: string | boolean | number | undefined,
  prevValue: string | boolean | undefined,
  transactionOperation: string,
  data?: IRuleDecisionExtended[],
) => {
  if (prevValue === value) {
    return undefined;
  }
  if (value === 0 || value === "0") {
    return undefined;
  }
  const decisionsByRule = {
    value:
      typeof value === "boolean"
        ? value
          ? EBooleanText.Y
          : EBooleanText.N
        : value,
    decisionId: getDecisionIdMethods(data, value as string),
    effectiveFrom: String(formatDate(new Date())),
    transactionOperation: transactionOperation,
  };
  return {
    ruleName: ruleName,
    modifyJustification: `${decisionsLabels.modifyJustification}${ruleName}`,
    decisionsByRule: [decisionsByRule],
  };
};

export { decisionWithoutConditions };
