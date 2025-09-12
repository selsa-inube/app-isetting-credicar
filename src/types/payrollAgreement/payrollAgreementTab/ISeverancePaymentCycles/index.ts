interface ISeverancePaymentCycles {
  abbreviatedName: string;
  numberOfDaysBeforePaymentToBill: number;
  paymentDay: string;
  payrollForDeductionAgreementId?: string;
  id?: string;
  regulatoryFrameworkCode?: string;
}

export type { ISeverancePaymentCycles };
