import { IRuleDecision } from "@isettingkit/input";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
interface IUseEditCreditLines {
  useCaseConfiguration: string;
  templateKey: string;
  decisionsData: IRuleDecisionExtended[];
  linesConstructionData: ILinesConstructionData;
  linesEditData: ILinesConstructionData;
  clientSupportData: IRules[] | undefined;

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
