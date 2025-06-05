import { IAction } from "../table/IAction";

interface IShowActionTitle {
  numberActions: number;
  mediaQuery: boolean;
  actionTitle: IAction[];
  withGeneralizedTitle: boolean;
  title?: boolean;
}

export type { IShowActionTitle };
