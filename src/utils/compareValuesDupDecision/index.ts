import { IValue } from "@ptypes/decisions/IValue";

type IComparableValue = string | number | string[] | IValue | undefined;
type IIndexable = Record<string, IComparableValue>;

const compareValuesDupDecision = (
  a: IComparableValue,
  b: IComparableValue,
): boolean => {
  if (typeof a !== typeof b) return false;

  if (
    typeof a === "object" &&
    a !== null &&
    typeof b === "object" &&
    b !== null
  ) {
    const indexableA = a as IIndexable;
    const indexableB = b as IIndexable;

    const keysA = Object.keys(indexableA).sort();
    const keysB = Object.keys(indexableB).sort();

    if (keysA.length !== keysB.length) return false;
    if (JSON.stringify(keysA) !== JSON.stringify(keysB)) return false;

    return keysA.every((key) =>
      compareValuesDupDecision(indexableA[key], indexableB[key]),
    );
  }

  return a === b;
};

export { compareValuesDupDecision };
