import { ILabel } from "@ptypes/ILabel";
import { IEntry } from "../table/IEntry";

interface ITrazabilityTab {
  data: IEntry;
  title: string;
  isMobile: boolean;
  labelsOfRequest: ILabel[];
  labelsOfTraceability: ILabel[];
}

export type { ITrazabilityTab };
