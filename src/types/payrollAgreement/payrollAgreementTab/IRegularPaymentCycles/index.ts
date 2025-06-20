interface IRegularPaymentCycles {
  numberOfDaysBeforePaymentToBill: number;
  paymentDay: string;
  payrollForDeductionAgreementId: string;
  regularPaymentCycleName: string;
  schedule: string;
  regularPaymentCycleNumber?: string;
}

export type { IRegularPaymentCycles };
