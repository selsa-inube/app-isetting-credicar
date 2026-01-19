import { IRuleDecision } from "@isettingkit/input";

const normalizeForComparison = (decision: IRuleDecision) => {
  return {
    ruleName: decision.ruleName,
    value: decision.value,
    effectiveFrom: decision.effectiveFrom,
    decisionId: decision.decisionId,
    conditionGroups: decision.conditionGroups
      ? decision.conditionGroups.map((group) => ({
          conditionsThatEstablishesTheDecision:
            group.conditionsThatEstablishesTheDecision?.map((cond) => ({
              conditionName: cond.conditionName,
              value: cond.value,
            })),
        }))
      : undefined,
  };
};

const decisionsEqual = (dec1: IRuleDecision, dec2: IRuleDecision) => {
  if (dec1.ruleName !== dec2.ruleName) return false;

  if (dec1.decisionId && dec2.decisionId) {
    return dec1.decisionId === dec2.decisionId;
  }

  const normalized1 = normalizeForComparison(dec1);
  const normalized2 = normalizeForComparison(dec2);

  return JSON.stringify(normalized1) === JSON.stringify(normalized2);
};

export { decisionsEqual };
