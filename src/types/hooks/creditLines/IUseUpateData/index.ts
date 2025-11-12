import { IConfiguredDecisions } from "@ptypes/decisions/IConfiguredDecisions";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IUseUpateData {
  move: boolean;
  supportIncludedData: () => string[];
  condition: string;
  templateKey: string;
  supportLine: IEnumerators[];
  itemInsert: string[];
  itemDelete: string[];
  setMove: React.Dispatch<React.SetStateAction<boolean>>;
  configuredDecisions?: IConfiguredDecisions[];
  currentRuleData?: IRuleDecisionExtended;
}

export type { IUseUpateData };
