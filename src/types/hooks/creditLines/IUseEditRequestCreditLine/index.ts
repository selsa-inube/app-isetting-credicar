import { IRuleDecision } from "@isettingkit/input";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { INameAndDescriptionEntry } from "@ptypes/creditLines/forms/INameAndDescriptionEntry";

interface IUseEditRequestCreditLine {
  useCaseConfiguration: string;
  decisionsData: IRuleDecisionExtended[];
  linesConstructionData: ILinesConstructionData;
  option: boolean;
  conditionCreditLine: string | undefined;
  currentValues: INameAndDescriptionEntry | undefined;
  setLinesConstructionData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  mergeRules: (
    existingRules?: IRuleDecision[],
    newRules?: IRuleDecision[],
  ) => IRuleDecision[];
}

export type { IUseEditRequestCreditLine };
