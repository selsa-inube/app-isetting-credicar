import { IConditionTraduction } from "@ptypes/IConditionTraduction";

const normalizeConditionTraduction = (
  conditionsArray: IConditionTraduction[],
  condition: string,
) => {
  return conditionsArray.find((cond) => cond.condition === condition);
};

export { normalizeConditionTraduction };
