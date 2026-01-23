import { IRuleDecision } from "@isettingkit/input";
import { ensureArrayGroupsDeep } from "../ensureArrayGroupsDeep";
import { localizeDecision } from "../localizeDecision";
import {
  getConditionsByGroupNew,
  groupsRecordToArrayNew,
  mapByGroupNew,
  parseRangeFromString,
} from "@isettingkit/business-rules";
import { normalizeCondition } from "../decisions/normalizeCondition";
import { localizeLabel } from "../localizeLabel";
import { geti18nValueDecision } from "../geti18nValueDecision";

const transformDecision = (
  d: IRuleDecision,
  language: "es" | "en" | undefined,
  editDecision?: boolean,
  initialDecision?: IRuleDecision,
  idInitial?: string,
): IRuleDecision => {
  const loc = ensureArrayGroupsDeep(
    localizeDecision(d, language),
    editDecision,
    initialDecision,
    idInitial,
  );
  const withSentences = loc;
  const mappedRecord = mapByGroupNew(
    getConditionsByGroupNew(withSentences),
    (condition) => ({
      ...normalizeCondition(condition),
      labelName: localizeLabel(
        condition as { labelName?: string; i18n?: Record<string, string> },
        language,
      ),
      i18nValue: geti18nValueDecision(
        condition.value,
        condition.listOfPossibleValues?.list,
      ),
      value: parseRangeFromString(condition.value),
    }),
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const out: IRuleDecision = {
    ...withSentences,
    i18nValue: geti18nValueDecision(
      withSentences.value,
      withSentences.listOfPossibleValues?.list as any,
    ),
    value: parseRangeFromString(withSentences.value),
    conditionGroups: groupsRecordToArrayNew(mappedRecord),
  } as any;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  delete (out as any).conditionsThatEstablishesTheDecision;
  return out;
};

export { transformDecision };
