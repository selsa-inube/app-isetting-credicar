import { EBooleanText } from "@enum/booleanText";
import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDate } from "../date/formatDate";

const decisionWithoutConditions = (
  ruleName: string,
  value: string | boolean | number | undefined,
  prevValue: string | boolean | undefined,
  option: boolean,
  data?: IRuleDecisionExtended[],
) => {
  const typeValue = typeof value === "number" ? String(value) : value;

  if (value === "" || value === undefined) return undefined;

  if (!option && prevValue === typeValue) {
    return undefined;
  }
  if (value === 0 || value === "0") {
    return undefined;
  }
  const decisionIdData = data && data.length ? data?.[0].decisionId : undefined;

  const decisionsByRule = {
    value:
      typeof value === "boolean"
        ? value
          ? EBooleanText.Y
          : EBooleanText.N
        : value,
    decisionId: decisionIdData,
    effectiveFrom: String(formatDate(new Date())),
    ...(!option && {
      transactionOperation:
        decisionIdData === undefined
          ? ETransactionOperation.INSERT
          : ETransactionOperation.PARTIAL_UPDATE,
    }),
  };

  return {
    ruleName: ruleName,
    ...(!option && {
      modifyJustification: `${decisionsLabels.modifyJustification}${ruleName}`,
    }),
    decisionsByRule: [decisionsByRule],
  };
};

export { decisionWithoutConditions };
