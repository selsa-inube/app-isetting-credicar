interface IDecisionsGeneralEntry {
  additionalDebtors: boolean;
  realGuarantees: boolean;
  PaymentCapacityBasedCreditLimit: boolean;
  ReciprocityBasedCreditLimit: boolean;
  RiskAnalysisBasedCreditLimit: boolean;
  DATACREDITO_EXPERIAN: boolean;
  TRANSUNION: boolean;
  inquiryValidityPeriod: number;
  toggleLineCreditPayrollSpecialAdvance: boolean;
  toggleLineCreditPayrollAdvance: boolean;
  lineCreditPayrollAdvance: string;
  lineCreditPayrollSpecialAdvance: string;
  maximumNotifDocSize: number;
}

export type { IDecisionsGeneralEntry };
