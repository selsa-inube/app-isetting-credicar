import { IRuleDecision } from "@isettingkit/input";
import { localizeLabel } from "../localizeLabel";
import {
  getConditionsByGroupNew,
  groupsRecordToArrayNew,
} from "@isettingkit/business-rules";
import { asArray } from "../asArray";
import { normalizeCondition } from "../decisions/normalizeCondition";

const localizeDecision = (
  raw: IRuleDecision,
  lang: "es" | "en" | undefined,
): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(raw ?? {}));
  cloned.labelName = localizeLabel(raw, lang);

  const groups: Record<string, unknown> = getConditionsByGroupNew(cloned) ?? {};
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const localizedGroupsRecord = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [
      g,
      asArray(list).map((c: any) =>
        normalizeCondition({ ...c, labelName: localizeLabel(c, lang) }),
      ),
    ]),
  );

  const out: IRuleDecision = {
    ...cloned,
    conditionGroups: groupsRecordToArrayNew(
      localizedGroupsRecord as Record<string, any[]>,
    ) as any,
  };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  delete (out as any).conditionsThatEstablishesTheDecision;
  return out;
};

export { localizeDecision };
