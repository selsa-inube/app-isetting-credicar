import { IAppData } from "@ptypes/context/IAppData";
import { IEditData } from "../IEditData";

interface IUseEditDestination {
  data: IEditData;
  appData: IAppData;
  loading: boolean;
  option?: string;
}
export type { IUseEditDestination };
