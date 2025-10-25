import { IEntry } from "@ptypes/design/table/IEntry";

interface IDataTable {
  columnWidths: number[];
  emptyDataMessage: string;
  entries: IEntry[];
  loadingCreditLines: boolean;
  searchCreditLines: string;
  pageLength: number;
  setEntryDeleted: React.Dispatch<React.SetStateAction<string | number>>;
}

export type { IDataTable };
