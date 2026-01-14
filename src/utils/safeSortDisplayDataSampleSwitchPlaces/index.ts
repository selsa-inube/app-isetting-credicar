import { IRuleDecision } from "@isettingkit/input";
import { ensureArrayGroupsDeep } from "../ensureArrayGroupsDeep";
import { nameToGroupOccurrences } from "../nameToGroupOccurrences";
import {
  groupsRecordToArrayNew,
  sortDisplayDataSampleSwitchPlaces,
} from "@isettingkit/business-rules";
import { toArrayConditionsDecision } from "../toArrayConditionsDecision";
import { isIRuleDecision } from "../isIRuleDecision";

const safeSortDisplayDataSampleSwitchPlaces = (input: {
  decisionTemplate?: IRuleDecision | null;
}): IRuleDecision => {
  try {
    const original = ensureArrayGroupsDeep(
      input.decisionTemplate ?? ({} as IRuleDecision),
    );

    const occurrences = nameToGroupOccurrences(original);

    const flatTpl = toArrayConditionsDecision(original);

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const sorted = sortDisplayDataSampleSwitchPlaces({
      decisionTemplate: flatTpl,
    }) as any;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const arr = Array.isArray(sorted?.conditionsThatEstablishesTheDecision)
      ? (sorted.conditionsThatEstablishesTheDecision as any[])
      : (((flatTpl as any).conditionsThatEstablishesTheDecision as
          | any[]
          | undefined) ?? []);

    const regrouped: Record<string, any[]> = {};
    const indexByName = new Map<string, number>();

    for (const c of arr) {
      const name = c?.conditionName;
      const seq = (name && occurrences.get(name)) ?? ["group-primary"];

      const i = indexByName.get(name) ?? 0;
      const gid = seq[Math.min(i, seq.length - 1)];
      indexByName.set(name, i + 1);

      (regrouped[gid] ||= []).push(c);
    }

    const base: IRuleDecision = isIRuleDecision(sorted) ? sorted : original;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const out: IRuleDecision = {
      ...base,
      conditionGroups: groupsRecordToArrayNew(regrouped) as any,
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    delete (out as any).conditionsThatEstablishesTheDecision;
    return out;
  } catch (err) {
    console.warn(
      "sortDisplayDataSampleSwitchPlaces failed, returning input:",
      err,
    );
    return ensureArrayGroupsDeep(
      input.decisionTemplate ?? ({} as IRuleDecision),
    );
  }
};

export { safeSortDisplayDataSampleSwitchPlaces };
