import { IValue } from "@isettingkit/input";

interface IConditionsTheDecision {
  conditionName: string;
  value: string;
  labelName?: string;
  transactionOperation?: string;
  i18n?: string;
  conditionDataType?: string;
  howToSetTheCondition?: string;
  listOfPossibleValues?: IValue;
  TimeUnit?: string;
  timeUnit?: string;
}

export type { IConditionsTheDecision };
