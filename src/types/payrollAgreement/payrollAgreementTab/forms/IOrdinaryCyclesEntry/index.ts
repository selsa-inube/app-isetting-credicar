interface IOrdinaryCyclesEntry {
  cycleId?: string;
  nameCycle?: string;
  payday?: string;
  regularPaymentCycleName?: string;
  id?: string;
  periodicity?: string;
  schedule?: string;
  paymentDay?: string;
  numberDaysUntilCut?: string | number;
  numberOfDaysBeforePaymentToBill?: string | number;
}

export type { IOrdinaryCyclesEntry };
