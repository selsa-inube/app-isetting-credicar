import { ICondition, IRuleDecision } from "@isettingkit/input";
import { formatDateDecision } from "../date/formatDateDecision";

const formatRuleDecisions = (
  rule: IRuleDecision[],
  dateEffectiveFrom?: string,
) =>
  rule.map((decision) => {
    const decisionsByRule: IRuleDecision = {
      conditionsThatEstablishesTheDecision:
        decision.conditionsThatEstablishesTheDecision
          ?.filter((condition) => condition.value !== undefined)
          .map((condition) => ({
            labelName: condition.labelName,
            conditionName: condition.conditionName,
            value: condition.value,
          })) as ICondition[],
      effectiveFrom: dateEffectiveFrom && formatDateDecision(dateEffectiveFrom),
      value: decision.value,
    };
    return { ruleName: decision.ruleName, decisionsByRule: [decisionsByRule] };
  });

export { formatRuleDecisions };
