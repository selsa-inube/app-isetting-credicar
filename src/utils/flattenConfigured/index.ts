import { geti18nValueDecision } from "../geti18nValueDecision";

/* eslint-disable @typescript-eslint/no-explicit-any */
const flattenConfigured = (configuredDecisions: any[] | undefined) => {
  if (!configuredDecisions || configuredDecisions.length === 0) return [];

  return configuredDecisions.flatMap((cfg: any) => {
    if (Array.isArray(cfg.decisionsByRule)) {
      return (cfg.decisionsByRule ?? []).map((d: any) => ({
        ...d,
        ruleName: cfg.ruleName ?? d.ruleName,
        i18nValues: geti18nValueDecision(d.value, d.listOfPossibleValues?.list),
      }));
    }
    return [cfg];
  });
};

export { flattenConfigured };
