interface IOrdinaryCyclesEntry {
  cycleId?: string;
  nameCycle?: string;
  payday?: string;
  regularPaymentCycleName?: string;
  id?: string | number;
  periodicity?: string;
  schedule?: string;
  paymentDay?: string;
  numberDaysUntilCut?: string | number;
  numberOfDaysBeforePaymentToBill?: string | number;
  laborRegulatorFramework?: string;
  payrollForDeductionAgreementId?: string;
}

export type { IOrdinaryCyclesEntry };
