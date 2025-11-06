import { IRuleDecision } from "@isettingkit/input";
import { decisionsInsertEqual } from "../decisionsInsertEqual";

const findInsertDecision = (arr: IRuleDecision[], decision: IRuleDecision) => {
  return arr.find((item) => decisionsInsertEqual(item, decision));
};

export { findInsertDecision };
