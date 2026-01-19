import { IValue } from "@isettingkit/input";
import { IListOfPossibleValuesHid } from "../IListOfPossibleValuesHid";

interface IConditionsTheDecision {
  conditionName: string;
  value: string;
  labelName?: string;
  transactionOperation?: string;
  i18n?: string;
  conditionDataType?: string;
  howToSetTheCondition?: string;
  listOfPossibleValues?: IValue;
  listOfPossibleValuesHidden?: IListOfPossibleValuesHid;
  TimeUnit?: string;
  timeUnit?: string;
}

export type { IConditionsTheDecision };
