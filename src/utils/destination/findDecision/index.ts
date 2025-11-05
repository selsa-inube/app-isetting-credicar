import { IRuleDecision } from "@isettingkit/input";
import { decisionsEqual } from "../decisionsEqual";

const findDecision = (arr: IRuleDecision[], decision: IRuleDecision) => {
  console.log("😒😒😒", { arr, decision });
  if (Object.values(arr).length === 0) return undefined;

  return arr.find((item) => decisionsEqual(item, decision));
};

export { findDecision };
