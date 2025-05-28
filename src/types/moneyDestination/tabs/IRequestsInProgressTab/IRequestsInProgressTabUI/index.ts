import { IEntry } from "@ptypes/design/table/IEntry";

interface IRequestsInProgressTabUI {
  entries: IEntry[];
  loading: boolean;
  searchrequestProgress: string;
  smallScreen: boolean;
  columnWidths: number[];
  setEntryCanceled: (value: string | number) => void;
  onSearchrequestProgress: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { IRequestsInProgressTabUI };
