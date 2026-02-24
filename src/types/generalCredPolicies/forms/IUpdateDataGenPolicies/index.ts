import { IRuleDecision } from "@isettingkit/input";
import { IDecisionsGeneralEntry } from "../IDecisionsGeneralEntry";

interface IUpdateDataGenPolicies {
  decisionsGeneral: { isValid: boolean; values: IDecisionsGeneralEntry };
  contributionsPortfolio: { isValid: boolean; values: IRuleDecision[] };
  incomePortfolio: { isValid: boolean; values: IRuleDecision[] };
  scoreModels: { isValid: boolean; values: IRuleDecision[] };
  minimumIncomePercentage: { isValid: boolean; values: IRuleDecision[] };
  basicNotificationFormat: { isValid: boolean; values: IRuleDecision[] };
  basicNotificationRecipient: { isValid: boolean; values: IRuleDecision[] };
  minimumCreditBureauRiskScore: { isValid: boolean; values: IRuleDecision[] };
  notificationChannel: { isValid: boolean; values: IRuleDecision[] };
  riskScoreApiUrl: { isValid: boolean; values: IRuleDecision[] };
}

export type { IUpdateDataGenPolicies };
