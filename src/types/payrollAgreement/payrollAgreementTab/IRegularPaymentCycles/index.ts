interface IRegularPaymentCycles {
  numberOfDaysBeforePaymentToBill: number;
  paymentDay: string;
  payrollForDeductionAgreementId: string;
  regularPaymentCycleName: string;
  regularPaymentCycleNumber: string;
  schedule: string;
}

export type { IRegularPaymentCycles };
