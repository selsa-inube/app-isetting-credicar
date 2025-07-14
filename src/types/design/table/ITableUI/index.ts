import { IAction } from "../IAction";
import { IEntry } from "../IEntry";
import { ITitle } from "../ITitle";

interface ITableUI {
  actions: IAction[];
  entriesLength: number;
  entries: IEntry[];
  filteredEntries: IEntry[];
  firstEntryInPage: number;
  loading: boolean;
  lastEntryInPage: number;
  ellipsisCell: boolean;
  titles: ITitle[];
  withActionMobile: boolean;
  withGeneralizedTitle: boolean;
  mobileTitle?: string;
  hasEntries: boolean;
  isPaginated: boolean;
  widthPercentageTotalColumns?: number;
  tableLayout: "fixed" | "auto";
  columnWidths?: number[];
  goToEndPage: () => void;
  goToFirstPage: () => void;
  nextPage: () => void;
  prevPage: () => void;
  mediaActionOpen: boolean;
  numberActions: number;
  TitleColumns: ITitle[];
  emptyDataMessage?: string;
  withActionsTitles?: boolean;
}

export type { ITableUI };
