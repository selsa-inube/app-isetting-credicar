/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision, IValue } from "@isettingkit/input";
import { withConditionSentences } from "../withConditionSentences";
import { ensureArrayGroupsDeep } from "../ensureArrayGroupsDeep";
import { localizeDecision } from "../localizeDecision";
import {
  getConditionsByGroup,
  mapByGroup,
  parseRangeFromString,
} from "@isettingkit/business-rules";
import { normalizeCondition } from "../normalizeCondition";
import { localizeLabel } from "../localizeLabel";

const transformDecision = (
  d: IRuleDecision,
  language: "es" | "en" | undefined,
): IRuleDecision => {
  const loc = ensureArrayGroupsDeep(localizeDecision(d, language));
  const withSentences = withConditionSentences(loc);
  return {
    ...withSentences,
    value: parseRangeFromString(withSentences.value),
    conditionsThatEstablishesTheDecision: mapByGroup(
      getConditionsByGroup(withSentences),
      (condition: {
        value: string | number | IValue | string[] | undefined;
      }) => ({
        ...normalizeCondition(condition),
        labelName: localizeLabel(
          condition as { labelName?: string; i18n?: Record<string, string> },
          language,
        ),
        value: parseRangeFromString(condition.value),
      }),
    ),
  } as any;
};
export { transformDecision };
