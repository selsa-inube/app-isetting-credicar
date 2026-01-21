import { IOption } from "@inubekit/inubekit";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";
import { IValue } from "@src/types/decisions/IValue";

const normalizeConditionValue = (
  conditionsArray: IConditionTraduction[],
  condition: string,
  value: string | number | string[] | IValue | undefined,
) => {
  const conditions = conditionsArray.find(
    (cond) => cond.condition === condition,
  )?.listPossibleValues?.list;

  if (conditions && conditions?.length > 0) {
    return (conditions as unknown as IOption[])?.find(
      (item) => item.id === value,
    )?.label;
  } else {
    return value;
  }
};

export { normalizeConditionValue };
