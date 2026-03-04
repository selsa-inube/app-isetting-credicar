import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const transformationRulesRequest = (rules: IRuleDecisionExtended[]) => {
  if (!rules || rules.length === 0) return {};

  return rules.reduce(
    (acc, { ruleName, decisionsByRule }) => {
      const decisions = decisionsByRule ?? [];

      if (!acc[ruleName as string]) {
        acc[ruleName as string] = [...decisions];
      } else {
        acc[ruleName as string].push(...decisions);
      }

      return acc;
    },
    {} as Record<string, unknown[]>,
  );
};

export { transformationRulesRequest };
