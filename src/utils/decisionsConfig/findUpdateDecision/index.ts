import { IRuleDecision } from "@isettingkit/input";
import { decisionsUpdateEqual } from "../decisionsUpdateEqual";

const findUpdateDecision = (arr: IRuleDecision[], decision: IRuleDecision) => {
  return arr.find((item) => decisionsUpdateEqual(item, decision));
};

export { findUpdateDecision };
