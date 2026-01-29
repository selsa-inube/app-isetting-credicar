import { SetStateAction } from "react";
import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";

interface IUseUpateData {
  move: boolean;
  supportIncludedData: () => string[];
  condition: string;
  templateKey: string;
  supportLine: IEnumerators[];
  itemInsert: string[];
  itemDelete: string[];
  setMove: React.Dispatch<React.SetStateAction<boolean>>;
  setLinesData: React.Dispatch<
    SetStateAction<IModifyConstructionResponse | undefined>
  >;
  configuredDecisions?: IConfiguredDecisions[];
  currentRuleData?: IRuleDecisionExtended;
}

export type { IUseUpateData };
