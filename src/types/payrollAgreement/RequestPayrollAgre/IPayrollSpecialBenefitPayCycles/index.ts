interface IPayrollSpecialBenefitPayCycles {
  abbreviatedName: string;
  numberOfDaysBeforePaymentToBill: number;
  paymentDay: string;
  payrollForDeductionAgreementId?: string;
  transactionOperation?: string;
}

export type { IPayrollSpecialBenefitPayCycles };
