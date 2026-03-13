import { ICondition } from "@isettingkit/input";

type IConditionExtended = ICondition & {
  timeUnit?: string;
};

export type { IConditionExtended };
