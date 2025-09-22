import { IValue, ValueDataType, ValueHowToSetUp } from "@isettingkit/input";
import { ILanguage } from "@ptypes/i18n";

interface IConditionEstablishesDecision {
  conditionDataType: (typeof ValueDataType)[keyof typeof ValueDataType];
  hidden?: boolean;
  conditionName: string;
  listOfPossibleValues?: IValue;
  switchPlaces?: boolean;
  value?: string | string[] | number | IValue | undefined;
  howToSetTheCondition: (typeof ValueHowToSetUp)[keyof typeof ValueHowToSetUp];
  labelName?: string;
  descriptionUse?: string;
  i18n?: ILanguage;
}

export type { IConditionEstablishesDecision };
