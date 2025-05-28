import { IRuleDecision } from "@isettingkit/input";
import { IDecisionsGeneralEntry } from "../IDecisionsGeneralEntry";

interface IUpdateDataGenPolicies {
  decisionsGeneral: { isValid: boolean; values: IDecisionsGeneralEntry };
  contributionsPortfolio: { isValid: boolean; values: IRuleDecision[] };
  incomePortfolio: { isValid: boolean; values: IRuleDecision[] };
  scoreModels: { isValid: boolean; values: IRuleDecision[] };
}

export type { IUpdateDataGenPolicies };
