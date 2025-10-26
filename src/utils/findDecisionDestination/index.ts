import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const findDecisionDestination = (
  arr: IRuleDecisionExtended[],
  decision: IRuleDecisionExtended,
) => {
  const decisionsEqual = (
    dec1: IRuleDecisionExtended,
    dec2: IRuleDecisionExtended,
  ): boolean => {
    if (dec1.ruleName !== dec2.ruleName) return false;
    const value1 = dec1.decisionsByRule?.map((decision) => decision.value);
    const value2 = dec2.decisionsByRule?.map((decision) => decision.value);

    return JSON.stringify(value1) === JSON.stringify(value2);
  };
  return arr.find((item) => decisionsEqual(item, decision));
};

export { findDecisionDestination };
