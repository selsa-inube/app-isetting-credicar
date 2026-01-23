/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
import { buildDecisionKey } from "../buildDecisionKey";
import { flattenConfigured } from "../flattenConfigured";
import { geti18nValueDecision } from "../geti18nValueDecision";

const mapDecisionIdsFromConfigured = (
  configuredDecisions: any[] | undefined,
  decisionsData: IRuleDecision[],
): IRuleDecision[] => {
  if (!configuredDecisions || configuredDecisions.length === 0) {
    return decisionsData;
  }

  if (!decisionsData || decisionsData.length === 0) {
    return decisionsData;
  }

  const flat = flattenConfigured(configuredDecisions);

  const idByKey = new Map<string, string>();

  flat.forEach((cfg) => {
    if (!cfg.decisionId) return;
    const key = buildDecisionKey(cfg);
    if (!key) return;
    idByKey.set(key, String(cfg.decisionId));
  });

  return decisionsData.map((decision: any) => {
    const key = buildDecisionKey(decision);
    const configuredId = key ? idByKey.get(key) : undefined;

    if (!configuredId) {
      return decision;
    }

    if (configuredId === decision.decisionId) {
      return decision;
    }

    const updated: IRuleDecision = {
      ...decision,
      i18nValue: geti18nValueDecision(
        decision.value,
        decision.listOfPossibleValues?.list,
      ),
      decisionId: configuredId,
      _originalDecisionId: configuredId,
    };

    return updated;
  });
};

export { mapDecisionIdsFromConfigured };
