import { IEntry } from "@ptypes/design/table/IEntry";

interface ICancel {
  data: IEntry;
  setEntryCanceled: (id: string | number) => void;
}

export type { ICancel };
