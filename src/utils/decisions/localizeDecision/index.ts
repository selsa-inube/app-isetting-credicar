/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
import { localizeLabel } from "../localizeLabel";
import { getConditionsByGroup } from "@isettingkit/business-rules";
import { normalizeCondition } from "../normalizeCondition";
import { asArray } from "../asArray";

const localizeDecision = (
  raw: IRuleDecision,
  lang: "es" | "en" | undefined,
): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(raw ?? {}));
  cloned.labelName = localizeLabel(raw, lang);

  const groups: Record<string, unknown> = getConditionsByGroup(cloned) ?? {};
  const localizedGroups = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [
      g,
      asArray(list).map((c: any) =>
        normalizeCondition({ ...c, labelName: localizeLabel(c, lang) }),
      ),
    ]),
  );

  (cloned as any).conditionsThatEstablishesTheDecision = localizedGroups as any;
  return cloned;
};
export { localizeDecision };