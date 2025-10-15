/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroup } from "@isettingkit/business-rules";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { asArray } from "../asArray";
import { formatDateDecision } from "../date/formatDateDecision";
import { toValueString } from "../toValueString";

const formatRuleDecisionsConfig = (
  rule: IRuleDecisionExtended[],
  validateUseEdit: boolean,
) =>
  rule.map((decision) => {
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

    const groups = (getConditionsByGroup(decision) || {}) as Record<
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
            value: toValueString(condition?.value),
          })),
        };

        if (validateUseEdit) {
          conditionGroup.ConditionGroupId = groupKey;
        }

        return conditionGroup;
      },
    );

    return { ruleName: decision.ruleName, decisionsByRule: [decisionsByRule] };
  });

export { formatRuleDecisionsConfig };
