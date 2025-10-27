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
    decisions2.some((d2) => {
      return JSON.stringify(d1.value) === JSON.stringify(d2.value);
    }),
  );
};

const arraysEqualWithoutDate = (
  arr1: IRuleDecisionExtended[],
  arr2: IRuleDecisionExtended[],
): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item1) =>
    arr2.some((item2) => compareDecisionsWithoutDate(item1, item2)),
  );
};

export { arraysEqualWithoutDate, compareDecisionsWithoutDate };
