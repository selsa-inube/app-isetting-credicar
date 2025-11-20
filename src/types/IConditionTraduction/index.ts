import { IValue } from "@isettingkit/input";
import { IEnumerators } from "../IEnumerators";

interface IConditionTraduction {
  condition: string;
  label: string;
  listPossibleValues?: IValue;
  howToSetTheCondition?: string;
  conditionDataType?: string;
  enumValues?: IEnumerators[];
}

export type { IConditionTraduction };
