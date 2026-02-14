import { EBooleanText } from "@enum/booleanText";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDate } from "../date/formatDate";

const decisionWithoutConditions = (
  ruleName: string,
  value: string | boolean | number | undefined,
  prevValue: string | boolean | undefined,
  transactionOperation: string,
  data?: IRuleDecisionExtended[],
) => {
  if (prevValue !== value) {
    const decisionsByRule = {
      value:
        typeof value === "boolean"
          ? value
            ? EBooleanText.Y
            : EBooleanText.N
          : value,
      decisionId: data && data.length > 0 ? data?.[0].decisionId : undefined,
      effectiveFrom: String(formatDate(new Date())),
      transactionOperation: transactionOperation,
    };
    return {
      ruleName: ruleName,
      modifyJustification: `${decisionsLabels.modifyJustification}${ruleName}`,
      decisionsByRule: [decisionsByRule],
    };
  }
};

export { decisionWithoutConditions };
