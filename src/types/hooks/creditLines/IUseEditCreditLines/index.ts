import { IRuleDecision, IValue } from "@isettingkit/input";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";

interface IUseEditCreditLines {
  useCaseConfiguration: string;
  templateKey: string;
  decisionsData: IRuleDecisionExtended[];
  linesConstructionData: ILinesConstructionData;
  linesEditData: ILinesConstructionData;
  addDecision: boolean;
  editDecision: boolean;
  deleteDecision: boolean;
  conditionTraduction: IConditionTraduction[];
  setLinesEditData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  setLinesConstructionData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  listValuesDecision?: IValue;
  enumValuesDecision?: IEnumerators[];
  mergeRules: (
    existingRules?: IRuleDecision[],
    newRules?: IRuleDecision[],
  ) => IRuleDecision[];
}

export type { IUseEditCreditLines };
