interface IDecisionsGeneralEntry {
  additionalDebtors: boolean;
  realGuarantees: boolean;
  PaymentCapacityBasedCreditLimit: boolean;
  ReciprocityBasedCreditLimit: boolean;
  RiskAnalysisBasedCreditLimit: boolean;
  creditBureausConsultReq: boolean;
  inquiryValidityPeriod: boolean;
  lineCreditPayrollAdvance: boolean;
  lineCreditPayrollSpecialAdvance: boolean;
  maximumNotifDocSize: boolean;
}

export type { IDecisionsGeneralEntry };
