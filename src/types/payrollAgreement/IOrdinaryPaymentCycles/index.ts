import { IEntry } from "@ptypes/design/table/IEntry";
import { ILabel } from "@ptypes/ILabel";

interface IOrdinaryPaymentCycles {
  data: IEntry[];
  labelsPaymentCard: ILabel[];
}

export type { IOrdinaryPaymentCycles };
