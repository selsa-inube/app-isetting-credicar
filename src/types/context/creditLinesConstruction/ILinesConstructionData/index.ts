import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface ILinesConstructionData {
  abbreviatedName?: string;
  alias?: string;
  descriptionUse?: string;
  lineOfCreditId?: string;
  settingRequestId: string;
  rules?: IRuleDecisionExtended[];
}

export type { ILinesConstructionData };
