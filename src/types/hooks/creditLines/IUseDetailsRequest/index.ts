import { IEntry } from "@ptypes/design/table/IEntry";

interface IUseDetailsRequest {
  configurationData: IEntry;
  useNameRequest?: string;
}

export type { IUseDetailsRequest };
