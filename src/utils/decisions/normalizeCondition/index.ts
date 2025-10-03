/* eslint-disable @typescript-eslint/no-explicit-any */
import { asArray } from "../asArray";

const normalizeCondition = (condition: any) => ({
  ...condition,
  listOfPossibleValues: asArray(condition?.listOfPossibleValues),
});

export { normalizeCondition };
