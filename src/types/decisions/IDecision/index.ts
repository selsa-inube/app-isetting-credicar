import {
  IDecision,
  IValue,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { ILanguage } from "@ptypes/i18n";
import { IConditionEstablishesDecision } from "../IConditionEstablishesDecision";

interface IDecisionData {
  businessRuleId?: string;
  conditionDataType?: (typeof ValueDataType)[keyof typeof ValueDataType];
  conditionName?: string;
  conditionsThatEstablishesTheDecision?: IConditionEstablishesDecision[];
  conditionThatEstablishesTheDecision?: IConditionEstablishesDecision[];
  decision?: IDecision;
  decisions?: IDecision[];
  decisionDataType?: (typeof ValueDataType)[keyof typeof ValueDataType];
  decisionId?: string;
  descriptionOfChange?: string;
  descriptionUse?: string;
  effectiveFrom?: Date | string;
  howToSetTheCondition?: (typeof ValueHowToSetUp)[keyof typeof ValueHowToSetUp];
  howToSetTheDecision?: (typeof ValueHowToSetUp)[keyof typeof ValueHowToSetUp];
  listOfPossibleValues?: IValue;
  ruleDataType?: (typeof ValueDataType)[keyof typeof ValueDataType];
  ruleName?: string;
  labelName?: string;
  transactionOperation?: string;
  validUntil?: Date | string;
  value?: string | string[] | number | IValue | undefined;
  i18n?: ILanguage;
}

export type { IDecisionData };
