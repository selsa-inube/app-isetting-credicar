import { IOptionsGenDecision } from "@ptypes/hooks/generalCreditPolicies/IOptionsGenDecision";
import { IDecisionsGeneralEntry } from "../IDecisionsGeneralEntry";

interface IRenderDecisionsGenVerification {
  values: IDecisionsGeneralEntry;
  isMobile: boolean;
  optionsGenDecision: IOptionsGenDecision;
}

export type { IRenderDecisionsGenVerification };
