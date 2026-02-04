interface IRegularPaymentCycles {
  numberOfDaysBeforePaymentToBill: number;
  paymentDay: string;
  payrollForDeductionAgreementId?: string;
  regularPaymentCycleName: string;
  schedule: string;
  regularPaymentCycleNumber?: string;
  regulatoryFrameworkCode?: string;
}

export type { IRegularPaymentCycles };
