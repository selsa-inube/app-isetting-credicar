import { IServerDomain } from "@ptypes/IServerDomain";

interface IOptionsGenDecision {
  payrollAdvance: IServerDomain[];
  payrollSpecialAdvance: IServerDomain[];
  creditBureaus: IServerDomain[];
}

export type { IOptionsGenDecision };
