interface IDecisionsGeneralEntry {
  additionalDebtors: boolean;
  realGuarantees: boolean;
  PaymentCapacityBasedCreditLimit: boolean;
  ReciprocityBasedCreditLimit: boolean;
  RiskAnalysisBasedCreditLimit: boolean;
  creditBureausConsultReq: boolean;
  inquiryValidityPeriod: boolean;
  toggleLineCreditPayrollSpecialAdvance: boolean;
  toggleLineCreditPayrollAdvance: boolean;
  lineCreditPayrollAdvance: string;
  lineCreditPayrollSpecialAdvance: string;
  maximumNotifDocSize: boolean;
}

export type { IDecisionsGeneralEntry };
