interface IPayrollSpecialBenefit {
  abbreviatedName: string;
  numberOfDaysBeforePaymentToBill: number;
  paymentDay: string;
  payrollForDeductionAgreementId?: string;
  id?: string;
  regulatoryFrameworkCode?: string;
}

export type { IPayrollSpecialBenefit };
