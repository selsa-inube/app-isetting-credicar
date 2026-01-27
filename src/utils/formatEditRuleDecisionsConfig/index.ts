/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroupNew } from "@isettingkit/business-rules";
import { ECreditLines } from "@enum/creditLines";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { asArray } from "../asArray";
import { formatDateDecision } from "../date/formatDateDecision";
import { geti18nValueDecision } from "../geti18nValueDecision";
import { normalizeConditionTraduction } from "../normalizeConditionTraduction";

const formatEditRuleDecisionsConfig = (
  rule: IRuleDecisionExtended[],
  validateUseEdit: boolean,
  abbreviatedName?: string,
  conditionHidden?: string,
  conditionTraduction?: IConditionTraduction[],
) => {
  return rule.map((decision) => {
    const decisionsByRule: Partial<IRuleDecisionExtended> = {
      ...decision,
      effectiveFrom:
        decision.effectiveFrom &&
        formatDateDecision(String(decision.effectiveFrom)),
      value: decision.value,
      i18nValue: geti18nValueDecision(
        decision.value,
        decision.listOfPossibleValues?.list as any,
      ),
      howToSetTheCondition: "EqualTo",
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

    decisionsByRule.conditionGroups = Object.entries(groups)
      .map(([groupKey, rawList]) => {
        const items = asArray(rawList).filter((item) => !item?.hidden);

        const conditionGroup: any = {
          conditionsThatEstablishesTheDecision: items.map((condition: any) => {
            const normalized = normalizeConditionTraduction(
              conditionTraduction ?? [],
              condition.conditionName,
            );
            return {
              ...condition,
              conditionName: condition?.conditionName ?? "",
              value: condition?.value,
              i18nValue: geti18nValueDecision(
                condition.value,
                normalized?.listPossibleValues?.list as any,
              ),
            };
          }),
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
      })
      .filter((group) => {
        const conditionsToValidate =
          group.conditionsThatEstablishesTheDecision.filter(
            (condition: any) =>
              condition.conditionName !== ECreditLines.CREDIT_LINE_RULE,
          );

        if (conditionsToValidate.length === 0) {
          return false;
        }

        return conditionsToValidate.every(
          (condition: any) =>
            condition.value !== undefined &&
            condition.value !== null &&
            condition.value !== "",
        );
      });

    return { ruleName: decision.ruleName, decisionsByRule: [decisionsByRule] };
  });
};

export { formatEditRuleDecisionsConfig };
