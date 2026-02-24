interface IDecisionsGeneralEntry {
  additionalDebtors: boolean;
  realGuarantees: boolean;
  PaymentCapacityBasedCreditLimit: boolean;
  ReciprocityBasedCreditLimit: boolean;
  RiskAnalysisBasedCreditLimit: boolean;
  creditBureausConsultReq: string;
  inquiryValidityPeriod: number | undefined;
  toggleLineCreditPayrollSpecialAdvance: boolean;
  toggleLineCreditPayrollAdvance: boolean;
  lineCreditPayrollAdvance: string;
  lineCreditPayrollSpecialAdvance: string;
  maximumNotifDocSize: number | undefined;
}

export type { IDecisionsGeneralEntry };
