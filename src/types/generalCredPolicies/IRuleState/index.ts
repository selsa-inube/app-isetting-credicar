import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

type IRuleKey =
  | "ReciprocityFactorForCreditLimit"
  | "RiskScoreFactorForCreditLimit"
  | "MinimumSubsistenceReservePercentage"
  | "CreditRiskScoringModel"
  | "BasicNotificationFormat"
  | "BasicNotificationRecipient"
  | "MinimumCreditBureauRiskScore"
  | "NotificationChannel"
  | "RiskScoreApiUrl";

type IRuleState = Record<IRuleKey, IRuleDecisionExtended[]>;

export type { IRuleState, IRuleKey };
