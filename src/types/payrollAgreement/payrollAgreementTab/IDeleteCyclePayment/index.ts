import { IEntry } from "@ptypes/design/table/IEntry";

interface IDeleteCyclePayment {
  data: IEntry;
  setEntryDeleted: (value: string | number) => void;
}

export type { IDeleteCyclePayment };
