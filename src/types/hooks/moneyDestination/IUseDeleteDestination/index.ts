import { IAppData } from "@ptypes/context/IAppData";
import { IEntry } from "@ptypes/design/table/IEntry";

interface IUseDeleteDestination {
  data: IEntry;
  appData: IAppData;
}

export type { IUseDeleteDestination };
