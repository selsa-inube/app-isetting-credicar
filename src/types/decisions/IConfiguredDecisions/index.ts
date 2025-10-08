import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";

interface IConfiguredDecisions {
  decisionsByRule: {
    conditionGroups: IConditionGroups[];
    coverage: number;
    decisionId: string;
    effectiveFrom: string;
    howToSetTheDecision: string;
    ruleDataType: string;
    ruleName: string;
    typeDecision: string;
    validUntil: string;
    value: string;
  }[];
  parameterizedConditions?: string[];
  ruleName?: string;
}

export type { IConfiguredDecisions };
