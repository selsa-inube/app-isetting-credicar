import { IEntry } from "@ptypes/design/table/IEntry";
import { ILabel } from "@ptypes/ILabel";

interface IGeneralDecisionsTab {
  data: IEntry;
  labelsDetails: ILabel[];
  loading: boolean;
}

export type { IGeneralDecisionsTab };
