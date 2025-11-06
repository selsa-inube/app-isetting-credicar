import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const decisionsInsertEqual = (
  dec1: IRuleDecisionExtended,
  dec2: IRuleDecisionExtended,
) => {
  if (dec1.ruleName !== dec2.ruleName) {
    return false;
  }

  if (dec1.decisionId === dec2.decisionId) {
    return false;
  }

  return JSON.stringify(JSON.stringify(dec1) === JSON.stringify(dec2));
};

export { decisionsInsertEqual };
