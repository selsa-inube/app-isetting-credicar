import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { decisionsEqual } from "../decisionsEqual";

const arraysEqual = (
  arr1: IRuleDecisionExtended[],
  arr2: IRuleDecisionExtended[],
) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (!decisionsEqual(arr1[i], arr2[i])) return false;
  }
  return true;
};

export { arraysEqual };
