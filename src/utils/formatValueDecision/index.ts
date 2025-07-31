/* eslint-disable @typescript-eslint/no-explicit-any */
import { convertRangeToString } from "@isettingkit/business-rules";

const formatValueDecision = (val: any) => {
  if (typeof val === "object" && val !== null && "from" in val && "to" in val) {
    return convertRangeToString(val);
  }
  return val;
};

export { formatValueDecision };
