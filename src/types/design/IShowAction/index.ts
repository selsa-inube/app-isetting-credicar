import { IAction } from "../table/IAction";
import { IEntry } from "../table/IEntry";

interface IShowAction {
  actionContent: IAction[];
  entry: IEntry;
  mediaQuery: boolean;
  withActionMobile: boolean;
}

export type { IShowAction };
