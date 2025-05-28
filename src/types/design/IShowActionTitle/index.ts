import { IAction } from "../table/IAction";

interface IShowActionTitle {
  numberActions: number;
  mediaQuery: boolean;
  actionTitle: IAction[];
  title?: boolean;
}

export type { IShowActionTitle };
