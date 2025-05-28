import { ILabel } from "@ptypes/ILabel";
import { IEntry } from "../table/IEntry";

interface IPaymentCycleCard {
  data: IEntry;
  numberCard: number;
  labels: ILabel[];
}

export type { IPaymentCycleCard };
