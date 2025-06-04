import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";

const getUniquePaydays = (
  regularPaymentCycles: IOrdinaryCyclesEntry[],
): string[] => {
  return Array.from(
    new Set(
      regularPaymentCycles
        .flatMap((cycle) =>
          cycle.payday?.split(",").map((payday) => payday.trim()),
        )
        .filter((payday): payday is string => typeof payday === "string"),
    ),
  );
};

export { getUniquePaydays };
