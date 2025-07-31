import { EBooleanText } from "@enum/booleanText";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { formatDate } from "../date/formatDate";

const decisionWithoutConditions = (
  ruleName: string,
  value: string | boolean,
  prevValue: string | boolean,
  transactionOperation: string,
  user: string,
) => {
  if (prevValue !== value) {
    const decisionsByRule = {
      value:
        typeof value === "boolean"
          ? value
            ? EBooleanText.YES
            : EBooleanText.NO
          : value,
      effectiveFrom: String(formatDate(new Date())),
      transactionOperation: transactionOperation,
    };
    return {
      ruleName: ruleName,
      modifyJustification: `${decisionsLabels.modifyJustification} ${user}`,
      decisionsByRule: [decisionsByRule],
    };
  }
};

export { decisionWithoutConditions };
