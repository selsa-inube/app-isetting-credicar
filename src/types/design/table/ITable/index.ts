import { IAction } from "../IAction";
import { IBreakpoint } from "../IBreakpoint";
import { IEntry } from "../IEntry";
import { ITitle } from "../ITitle";

interface ITable {
  entries: IEntry[];
  id: string;
  loading: boolean;
  titles: ITitle[];
  actions: IAction[];
  breakpoints: IBreakpoint[];
  withGeneralizedTitle?: boolean;
  filter?: string;
  infoTitle?: string;
  mobileTitle?: string;
  pageLength?: number;
  widthPercentageTotalColumns?: number;
  ellipsisCell?: boolean;
  columnWidths?: number[];
  emptyDataMessage?: string;
  withActionsTitles?: boolean;
  tableLayout?: "fixed" | "auto";
  withActionMobile?: boolean;
}

export type { ITable };
