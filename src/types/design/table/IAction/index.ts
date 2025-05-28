import { IEntry } from "../IEntry";

interface IAction {
  id: string;
  content: (entry: IEntry) => React.ReactNode;
  mobilePriority?: boolean;
  actionName?: string;
  onClick?: (entry: IEntry) => void;
}

export type { IAction };
