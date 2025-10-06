/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  buildEsConditionSentence,
  EValueHowToSetUp,
  getConditionsByGroup,
} from "@isettingkit/business-rules";
import { IRuleDecision } from "@isettingkit/input";
import { asArray } from "../asArray";
import { normalizeHowToSet } from "../normalizeHowToSet";

const withConditionSentences = (
  decision: IRuleDecision,
  isPrimaryFirst = true,
): IRuleDecision => {
  const decisionClone: IRuleDecision = JSON.parse(JSON.stringify(decision));
  const groups = (getConditionsByGroup(decisionClone) || {}) as Record<
    string,
    unknown
  >;

  const orderedKeys = [
    ...Object.keys(groups).filter((groupKey) => groupKey === "group-primary"),
    ...Object.keys(groups).filter((groupKey) => groupKey !== "group-primary"),
  ];

  let firstUsed = !isPrimaryFirst;

  const decorated = Object.fromEntries(
    orderedKeys.map((groupKey) => {
      const list = asArray(groups[groupKey]);
      const mapped = list.map((condition: any, idx: number) => {
        const isFirst = !firstUsed && groupKey === "group-primary" && idx === 0;
        if (isFirst) firstUsed = true;

        const how = normalizeHowToSet(
          condition.howToSetTheCondition ??
            condition.valueUse ??
            EValueHowToSetUp.EQUAL,
        );

        const sentence = buildEsConditionSentence({
          label: condition.labelName || "",
          howToSet: how as any,
          isFirst,
        });

        return { ...condition, labelName: sentence };
      });
      return [groupKey, mapped];
    }),
  );

  (decision as any).conditionsThatEstablishesTheDecision = decorated as any;
  return decision;
};

export { withConditionSentences };
