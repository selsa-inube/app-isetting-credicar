import { IRules } from "../IRules";

interface ILinesConstructionData {
  abbreviatedName: string;
  alias: string;
  descriptionUse: string;
  lineOfCreditId: string;
  rules?: IRules[];
}

export type { ILinesConstructionData };
