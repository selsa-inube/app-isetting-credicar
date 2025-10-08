import { IRuleDecisionExtended } from "@src/types/IRuleDecisionExtended";

interface ILinesConstructionData {
  abbreviatedName: string;
  alias: string;
  descriptionUse: string;
  lineOfCreditId: string;
  settingRequestId: string;
  rules?: IRuleDecisionExtended[];
}

export type { ILinesConstructionData };
