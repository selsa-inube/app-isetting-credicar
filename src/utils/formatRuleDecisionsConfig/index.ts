/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroupNew } from "@isettingkit/business-rules";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { asArray } from "../asArray";
import { formatDateDecision } from "../date/formatDateDecision";

const formatRuleDecisionsConfig = (
  rule: IRuleDecisionExtended[],
  validateUseEdit: boolean,
  abbreviatedName: string,
  conditionHidden?: string,
) => {
  return rule.map((decision) => {
    const decisionsByRule: Partial<IRuleDecisionExtended> = {
      ...decision,
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

    const groups = (getConditionsByGroupNew(decision) || {}) as Record<
      string,
      unknown
    >;

    decisionsByRule.conditionGroups = Object.entries(groups).map(
      ([groupKey, rawList]) => {
        const items = asArray(rawList).filter((item) => !(item as any)?.hidden);
        const conditionGroup: any = {
          conditionsThatEstablishesTheDecision: items.map((condition: any) => ({
            ...condition,
            conditionName: condition?.conditionName ?? "",
            value: condition?.value,
          })),
        };

        if (validateUseEdit) {
          conditionGroup.conditionGroupId = groupKey;
        }

        if (conditionHidden) {
          conditionGroup.conditionsThatEstablishesTheDecision.push({
            conditionName: conditionHidden,
            value: abbreviatedName,
          });
        }

        return conditionGroup;
      },
    );

    return { ruleName: decision.ruleName, decisionsByRule: [decisionsByRule] };
  });
};

export { formatRuleDecisionsConfig };
