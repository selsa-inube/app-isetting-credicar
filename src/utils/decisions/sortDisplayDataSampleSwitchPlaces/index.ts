/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
import { ensureArrayGroupsDeep } from "../ensureArrayGroupsDeep";
import { nameToGroupMapOf } from "../nameToGroupMapOf";
import { toArrayConditionsDecision } from "../toArrayConditionsDecision";
import { sortDisplayDataSampleSwitchPlaces } from "@isettingkit/business-rules";
import { isIRuleDecision } from "../isIRuleDecision";

const safeSortDisplayDataSampleSwitchPlaces = (input: {
  decisionTemplate?: IRuleDecision | null;
  nameToGroup?: Map<string, string>;
}): IRuleDecision => {
  try {
    const original = ensureArrayGroupsDeep(
      input.decisionTemplate ?? ({} as IRuleDecision),
    );
    const nameToGroup = input.nameToGroup ?? nameToGroupMapOf(original);

    const flatTpl = toArrayConditionsDecision(original);
    const sorted = sortDisplayDataSampleSwitchPlaces({
      decisionTemplate: flatTpl,
    }) as any;

    const arr = Array.isArray(sorted?.conditionsThatEstablishesTheDecision)
      ? (sorted.conditionsThatEstablishesTheDecision as any[])
      : (((flatTpl as any).conditionsThatEstablishesTheDecision as
          | any[]
          | undefined) ?? []);

    const regrouped: Record<string, any[]> = {};
    for (const c of arr) {
      const g = nameToGroup.get(c?.conditionName) ?? "group-primary";
      (regrouped[g] ||= []).push(c);
    }

    return {
      ...(isIRuleDecision(sorted) ? sorted : original),
      conditionsThatEstablishesTheDecision: regrouped as any,
    } as IRuleDecision;
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
