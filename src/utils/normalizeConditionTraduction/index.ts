import { IConditionTraduction } from "@src/types/IConditionTraduction";

const normalizeConditionTraduction = (
  conditionsArray: IConditionTraduction[],
  condition: string,
) => {
  return conditionsArray.find((cond) => cond.condition === condition);
};

export { normalizeConditionTraduction };
