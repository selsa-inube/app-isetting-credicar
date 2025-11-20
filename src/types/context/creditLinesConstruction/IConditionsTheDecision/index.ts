import { IValue } from "@isettingkit/input";
import { IEnumerators } from "@ptypes/IEnumerators";

interface IConditionsTheDecision {
  conditionName: string;
  value: string;
  labelName?: string;
  transactionOperation?: string;
  i18n?: string;
  conditionDataType?: string;
  howToSetTheCondition?: string;
  listOfPossibleValues?: IValue;
  enumValues?: IEnumerators[];
  TimeUnit?: string;
  timeUnit?: string;
}

export type { IConditionsTheDecision };
