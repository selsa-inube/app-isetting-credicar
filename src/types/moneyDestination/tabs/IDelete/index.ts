import { IEntry } from "@ptypes/design/table/IEntry";

interface IDelete {
  data: IEntry;
  setEntryDeleted: (id: string | number) => void;
}

export type { IDelete };
