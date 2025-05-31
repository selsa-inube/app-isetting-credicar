interface IRegularPaymentCycles {
  numberOfDaysBeforePaymentToBill: number;
  paymentDay: string;
  regularPaymentCycleName: string;
  regularPaymentCycleNumber: string;
  schedule: string;
  payrollForDeductionAgreementId?: string;
  transactionOperation?: string;
}

export type { IRegularPaymentCycles };
