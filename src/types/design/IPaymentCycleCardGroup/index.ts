import { ILabel } from "@ptypes/ILabel";
import { IEntry } from "../table/IEntry";

interface IPaymentCycleCardGroup {
  data: IEntry[];
  labelsPaymentCard: ILabel[];
}

export type { IPaymentCycleCardGroup };
