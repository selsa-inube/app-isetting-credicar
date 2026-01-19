import { IDecisionsByRule } from "@ptypes/context/creditLinesConstruction/IDecisionsByRule";

const decisionsEqualServices = (
  arr1: IDecisionsByRule[] | undefined,
  arr2: IDecisionsByRule[] | undefined,
) => {
  if (!arr1 || !arr2) return arr1 === arr2;
  if (arr1.length !== arr2.length) return false;

  return arr1.every((dec1) =>
    arr2.some(
      (dec2) =>
        dec1.decisionId === dec2.decisionId &&
        dec1.ruleName === dec2.ruleName &&
        dec1.ruleDataType === dec2.ruleDataType &&
        dec1.value === dec2.value &&
        dec1.howToSetTheDecision === dec2.howToSetTheDecision &&
        dec1.effectiveFrom === dec2.effectiveFrom &&
        dec1.validUntil === dec2.validUntil,
    ),
  );
};

export { decisionsEqualServices };
