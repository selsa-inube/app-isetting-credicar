import { ICondition, IRuleDecision } from "@isettingkit/input";
import { formatDateDecision } from "../date/formatDateDecision";

const formatRuleDecisionsConfig = (rule: IRuleDecision[]) =>
  rule.map((decision) => {
    const decisionsByRule: IRuleDecision = {
      effectiveFrom:
        decision.effectiveFrom &&
        formatDateDecision(String(decision.effectiveFrom)),
      value: decision.value,
    };

    if (decision.validUntil) {
      decisionsByRule.validUntil = formatDateDecision(
        String(decision.validUntil),
      );
    }

    if (decision.conditionsThatEstablishesTheDecision) {
      //decisionsByRule.conditionGroups = decision.conditionGroups.map((conditionGroup)=>({
      // conditionGroupId: conditionGroup.,
      decisionsByRule.conditionsThatEstablishesTheDecision =
        decision.conditionsThatEstablishesTheDecision
          ?.filter((condition) => condition.value !== undefined)
          .map((condition) => ({
            conditionName: condition.conditionName,
            value: condition.value,
          })) as ICondition[];
    }
    //}))
    //}

    return { ruleName: decision.ruleName, decisionsByRule: [decisionsByRule] };
  });

export { formatRuleDecisionsConfig };
