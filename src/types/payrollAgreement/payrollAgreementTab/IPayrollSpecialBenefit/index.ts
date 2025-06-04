interface IPayrollSpecialBenefit {
  abbreviatedName: string;
  numberOfDaysBeforePaymentToBill: number;
  paymentDay: string;
  payrollForDeductionAgreementId?: string;
  id?: string;
}

export type { IPayrollSpecialBenefit };
