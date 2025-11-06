import { IRuleDecision } from "@isettingkit/input";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
interface IUseEditCreditLines {
  useCaseConfiguration: string;
  templateKey: string;
  decisionsData: IRuleDecisionExtended[];
  linesConstructionData: ILinesConstructionData;
  linesEditData: ILinesConstructionData;
  addDecision: boolean;
  editDecision: boolean;
  deleteDecision: boolean;
  setLinesEditData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  setLinesConstructionData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  mergeRules: (
    existingRules?: IRuleDecision[],
    newRules?: IRuleDecision[],
  ) => IRuleDecision[];
}

export type { IUseEditCreditLines };
