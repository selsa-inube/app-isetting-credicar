import { ILabel } from "@ptypes/ILabel";
import { IEntry } from "../table/IEntry";

interface IErrorTab {
  data: IEntry;
  title: string;
  isMobile: boolean;
  labelsOfRequest: ILabel[];
}

export type { IErrorTab };
