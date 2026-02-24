// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rows = (values: Record<string, any>): string[] => {
  return Object.entries(values)
    .filter(([key, value]) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }

      if (
        value === undefined ||
        value === "" ||
        key === "DATACREDITO_EXPERIAN" ||
        key === "TRANSUNION" ||
        key === "toggleLineCreditPayrollAdvance" ||
        key === "toggleLineCreditPayrollSpecialAdvance"
      ) {
        return false;
      }

      return true;
    })
    .map(([, value]) => value) as string[];
};

export { rows };
