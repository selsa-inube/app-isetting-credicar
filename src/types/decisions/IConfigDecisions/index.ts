import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";

interface IConfigDecisions {
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
  labelName?: string;
}

export type { IConfigDecisions };
