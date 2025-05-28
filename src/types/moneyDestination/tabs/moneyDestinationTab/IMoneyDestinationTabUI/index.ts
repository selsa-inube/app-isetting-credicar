import { IEntry } from "@ptypes/design/table/IEntry";

interface IMoneyDestinationTabUI {
  entries: IEntry[];
  loading: boolean;
  searchMoneyDestination: string;
  smallScreen: boolean;
  columnWidths: number[];
  onSearchMoneyDestination: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setEntryDeleted: (value: string | number) => void;
}

export type { IMoneyDestinationTabUI };
