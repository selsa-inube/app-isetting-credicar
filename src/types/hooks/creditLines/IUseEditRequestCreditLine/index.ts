import { IRuleDecision } from "@isettingkit/input";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IUseEditRequestCreditLine {
  useCaseConfiguration: string;
  decisionsData: IRuleDecisionExtended[];
  linesConstructionData: ILinesConstructionData;
  setLinesConstructionData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  mergeRules: (
    existingRules?: IRuleDecision[],
    newRules?: IRuleDecision[],
  ) => IRuleDecision[];
}

export type { IUseEditRequestCreditLine };
