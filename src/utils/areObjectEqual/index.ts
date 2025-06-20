import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";

const areObjectsEqual = (
  originalCycle: IOrdinaryCyclesEntry,
  newCycle: IOrdinaryCyclesEntry,
) => {
  return (
    originalCycle.cycleId === newCycle.cycleId &&
    originalCycle.payday === newCycle.payday
  );
};

export { areObjectsEqual };
