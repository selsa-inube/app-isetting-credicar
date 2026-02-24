import { IAppData } from "@ptypes/context/IAppData";
import { IEntry } from "@ptypes/design/table/IEntry";

interface IUseModifyRequest {
  appData: IAppData;
  data: IEntry;
  optionRequest: boolean;
}

export type { IUseModifyRequest };
