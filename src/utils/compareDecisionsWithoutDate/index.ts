import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const compareDecisionsWithoutDate = (
  decision1: IRuleDecisionExtended,
  decision2: IRuleDecisionExtended,
): boolean => {
  if (decision1.ruleName !== decision2.ruleName) return false;

  const decisions1 = decision1.decisionsByRule || [];
  const decisions2 = decision2.decisionsByRule || [];

  if (decisions1.length !== decisions2.length) return false;
  return decisions1.every((d1) =>
    decisions2.some((d2) => d1.value === d2.value),
  );
};

const arraysEqualWithoutDate = (
  arr1: IRuleDecisionExtended[],
  arr2: IRuleDecisionExtended[],
) => {
  if (arr1.length !== arr2.length) return false;
  for (let item = 0; item < arr1.length; item++) {
    if (!compareDecisionsWithoutDate(arr1[item], arr2[item])) return false;
  }
  return true;
};

export { arraysEqualWithoutDate };
