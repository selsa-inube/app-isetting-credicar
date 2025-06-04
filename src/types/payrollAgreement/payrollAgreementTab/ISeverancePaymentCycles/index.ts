interface ISeverancePaymentCycles {
  abbreviatedName: string;
  numberOfDaysBeforePaymentToBill: number;
  paymentDay: string;
  payrollForDeductionAgreementId?: string;
  id?: string;
}

export type { ISeverancePaymentCycles };
