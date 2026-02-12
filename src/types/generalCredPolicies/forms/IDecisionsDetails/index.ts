import { IRuleDecision } from "@isettingkit/input";

interface IDecisionsDetails {
  reciprocity: IRuleDecision[];
  incomePortfolio: IRuleDecision[];
  scoreModels: IRuleDecision[];
  minimum: IRuleDecision[];
  basicNotifFormat: IRuleDecision[];
  basicNotifRecipient: IRuleDecision[];
  minCredBureauRiskScore: IRuleDecision[];
  notifChannel: IRuleDecision[];
  riskScoreApiUrl: IRuleDecision[];
}

export type { IDecisionsDetails };
