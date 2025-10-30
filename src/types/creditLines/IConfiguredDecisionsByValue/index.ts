import { IConfigDecisions } from "@ptypes/decisions/IConfigDecisions";

interface IConfiguredDecisionsByValue {
  decisions: IConfigDecisions[];
  valuesInCondition: string[];
}

export type { IConfiguredDecisionsByValue };
