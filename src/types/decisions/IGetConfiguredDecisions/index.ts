import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";

interface IGetConfiguredDecisions {
  decisions: [
    {
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
    },
  ];
  parameterizedConditions: [string];
}

export type { IGetConfiguredDecisions };
