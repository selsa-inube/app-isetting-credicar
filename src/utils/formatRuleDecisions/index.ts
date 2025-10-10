import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDateDecision } from "../date/formatDateDecision";

const formatRuleDecisions = (
  rule: IRuleDecisionExtended[],
  dateEffectiveFrom: string,
) =>
  rule.map((decision) => {
    const decisionsByRule: Partial<IRuleDecisionExtended> = {
      effectiveFrom: dateEffectiveFrom && formatDateDecision(dateEffectiveFrom),
      value: decision.value,
      conditionGroups: decision.conditionGroups,
    };

    if (decision.validUntil) {
      decisionsByRule.validUntil =
        decision.validUntil && formatDateDecision(String(decision.validUntil));
    }

    return { ruleName: decision.ruleName, decisionsByRule: [decisionsByRule] };
  });

export { formatRuleDecisions };
