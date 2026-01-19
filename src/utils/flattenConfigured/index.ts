/* eslint-disable @typescript-eslint/no-explicit-any */
const flattenConfigured = (configuredDecisions: any[] | undefined) => {
  if (!configuredDecisions || configuredDecisions.length === 0) return [];

  return configuredDecisions.flatMap((cfg: any) => {
    if (Array.isArray(cfg.decisionsByRule)) {
      return (cfg.decisionsByRule ?? []).map((d: any) => ({
        ...d,
        ruleName: cfg.ruleName ?? d.ruleName,
      }));
    }
    return [cfg];
  });
};

export { flattenConfigured };
