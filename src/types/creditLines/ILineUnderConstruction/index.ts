import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";

interface ILineUnderConstruction {
  abbreviatedName: string;
  alias: string;
  descriptionUse: string;
  rules: IRules[];
  lineOfCreditId?: string;
}

export type { ILineUnderConstruction };
