import { IConfigDecisions } from "../IConfigDecisions";

interface IGetConfiguredDecisions {
  decisions: IConfigDecisions[];
  parameterizedConditions: string[];
}

export type { IGetConfiguredDecisions };
