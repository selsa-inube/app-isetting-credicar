import { IConditionEstablishesDecision } from "../IConditionEstablishesDecision";
import { IValue } from "../IValue";

interface IDecision {
  businessRuleId?: string;
  conditionDataType?: string;
  conditionName?: string;
  conditionsThatEstablishesTheDecision?: IConditionEstablishesDecision[];
  conditionThatEstablishesTheDecision?: IConditionEstablishesDecision[];
  decision?: IDecision;
  decisions?: IDecision[];
  decisionDataType?: string;
  decisionId?: string;
  descriptionOfChange?: string;
  descriptionUse?: string;
  effectiveFrom?: Date | string;
  howToSetTheCondition?: string;
  howToSetTheDecision?: string;
  labelName?: string;
  listOfPossibleValues?: string;
  ruleDataType?: string;
  ruleName?: string;
  transactionOperation?: string;
  validUntil?: Date | string;
  value?: string | string[] | number | IValue | undefined;
}

export type { IDecision };
