import { IEntry } from "@ptypes/design/table/IEntry";

interface IUseDeleteCyclePayment {
  data: IEntry;
  setEntryDeleted: (id: string | number) => void;
}

export type { IUseDeleteCyclePayment };
