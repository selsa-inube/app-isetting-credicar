import { ILabel } from "@ptypes/ILabel";
import { IEntry } from "@src/types/design/table/IEntry";

interface IRequestsInProcess {
  data: IEntry;
  labelsOfRequest: ILabel[];
  labelsOfTraceability: ILabel[];
  isMobile: boolean;
  onCloseModal: () => void;
  onClick: () => void;
}

export type { IRequestsInProcess };
