import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";

interface IUseConfiguredDecision {
  ruleName: string;
  decisionValue: string;
  useCaseConfiguration: string;
  linesConstructionData: ILinesConstructionData;
}

export type { IUseConfiguredDecision };
