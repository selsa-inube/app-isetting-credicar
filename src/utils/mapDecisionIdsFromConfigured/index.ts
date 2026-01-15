/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const mapDecisionIdsFromConfigured = (
  configuredDecisions: any[] | undefined,
  decisionsData: IRuleDecisionExtended[],
): IRuleDecisionExtended[] => {
  if (!configuredDecisions || configuredDecisions.length === 0) {
    return decisionsData;
  }

  if (!decisionsData || decisionsData.length === 0) {
    return decisionsData;
  }

  const flatConfigured = configuredDecisions.flatMap((cfg: any) =>
    (cfg.decisionsByRule ?? []).map((d: any) => ({
      ...d,
      ruleName: cfg.ruleName ?? d.ruleName,
    })),
  );

  return decisionsData.map((decision) => {
    const matched = flatConfigured.find(
      (cfg: any) =>
        cfg.ruleName === decision.ruleName &&
        cfg.value === decision.value &&
        cfg.effectiveFrom === decision.effectiveFrom &&
        cfg.howToSetTheDecision === decision.howToSetTheDecision,
    );

    if (!matched || !matched.decisionId) {
      return decision;
    }

    if (
      matched.decisionId === decision.decisionId &&
      matched.decisionId === decision._originalDecisionId
    ) {
      return decision;
    }

    return {
      ...decision,
      decisionId: matched.decisionId,
      _originalDecisionId: matched.decisionId,
    };
  });
};

export { mapDecisionIdsFromConfigured };
