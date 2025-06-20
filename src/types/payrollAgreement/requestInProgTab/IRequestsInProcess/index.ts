import { ILabel } from "@ptypes/ILabel";
import { IEntry } from "@ptypes/design/table/IEntry";

interface IRequestsInProcess {
  data: IEntry;
  title: string;
  labelsOfRequest: ILabel[];
  labelsOfTraceability: ILabel[];
  isMobile: boolean;
  onCloseModal: () => void;
  onClick: () => void;
}

export type { IRequestsInProcess };
