import { IEntry } from "@ptypes/design/table/IEntry";

interface IDataTable {
  columnWidths: number[];
  emptyDataMessage: string;
  entries: IEntry[];
  loadingCreditLines: boolean;
  searchCreditLines: string;
}

export type { IDataTable };
