import { IValue } from "@isettingkit/input";

interface IConditionTraduction {
  condition: string;
  label: string;
  listPossibleValues?: IValue;
  howToSetTheCondition?: string;
  conditionDataType?: string;
  timeUnit?: string;
}

export type { IConditionTraduction };
