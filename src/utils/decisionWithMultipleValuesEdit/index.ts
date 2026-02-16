import { ETransactionOperation } from "@enum/transactionOperation";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { getDecisionIdMethods } from "../decisions/getDecisionIdMethods";
import { formatDate } from "../date/formatDate";

const decisionWithMultipleValuesEdit = (
  ruleName: string,
  value: string,
  prevValue: string,
  data?: IRuleDecisionExtended[],
) => {
  const normalizeValues = (str: string): string[] => {
    return str
      ? str
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v !== "")
      : [];
  };

  const prevValues = new Set(normalizeValues(prevValue));
  const currentValues = new Set(normalizeValues(value));

  const addedValues = [...currentValues].filter((v) => !prevValues.has(v));
  const deletedValues = [...prevValues].filter((v) => !currentValues.has(v));

  if (addedValues.length === 0 && deletedValues.length === 0) {
    return undefined;
  }

  const createDecision = (
    val: string,
    operation: ETransactionOperation.INSERT | ETransactionOperation.DELETE,
  ) => ({
    value: val,
    effectiveFrom: String(formatDate(new Date())),
    decisionId: getDecisionIdMethods(data, val),
    transactionOperation: operation,
  });

  const decisionsByRule = [
    ...addedValues.map((val) =>
      createDecision(val, ETransactionOperation.INSERT),
    ),
    ...deletedValues.map((val) =>
      createDecision(val, ETransactionOperation.DELETE),
    ),
  ];

  return {
    ruleName,
    decisionsByRule,
    modifyJustification: `${decisionsLabels.modifyJustification}${ruleName}`,
  };
};

export { decisionWithMultipleValuesEdit };
