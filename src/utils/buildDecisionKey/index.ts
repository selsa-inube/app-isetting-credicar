/* eslint-disable @typescript-eslint/no-explicit-any */
import { stableStringify } from "../stableStringify";

const buildDecisionKey = (d: any) => {
  if (!d) return "";
  const ruleName = d.ruleName ?? "";
  const eff = d.effectiveFrom ?? "";
  const valueStr = stableStringify(d.value ?? null);
  return `${ruleName}::${eff}::${valueStr}`;
};

export { buildDecisionKey };
