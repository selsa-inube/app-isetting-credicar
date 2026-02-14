import { IOptionsGenDecision } from "@ptypes/hooks/generalCreditPolicies/IOptionsGenDecision";
import { IUpdateDataGenPolicies } from "../IUpdateDataGenPolicies";

interface IVerificationBoxes {
  updatedData: IUpdateDataGenPolicies;
  stepKey: number;
  isMobile: boolean;
  optionsGenDecision: IOptionsGenDecision;
}

export type { IVerificationBoxes };
