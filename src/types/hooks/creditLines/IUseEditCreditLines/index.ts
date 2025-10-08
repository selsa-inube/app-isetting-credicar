import { IRuleDecision } from "@isettingkit/input";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IUseEditCreditLines {
  useCaseConfiguration: string;
  templateKey: string;
  decisionsData: IRuleDecisionExtended[];
  setLinesConstructionData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  linesConstructionData: ILinesConstructionData;
  mergeRules: (
    existingRules?: IRuleDecision[],
    newRules?: IRuleDecision[],
  ) => IRuleDecision[];
}

export type { IUseEditCreditLines };
