import { decisionsEqualServices } from "@utils/decisions/decisionsEqualServices";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const findDecisionServices = (
  arr: IRuleDecisionExtended[],
  decision: IRuleDecisionExtended,
) => {
  if (!arr || arr.length === 0) return undefined;

  return arr.find(
    (ruleGroup) =>
      ruleGroup.ruleName === decision.ruleName &&
      decisionsEqualServices(
        ruleGroup.decisionsByRule,
        decision.decisionsByRule,
      ),
  );
};

export { findDecisionServices };
