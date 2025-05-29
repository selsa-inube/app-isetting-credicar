import { ILabel } from "@src/types/ILabel";
import { IEntry } from "../table/IEntry";

interface IDetailsCyclesModal {
  data: IEntry;
  labelsDetails: ILabel[];
  portalId: string;
  title: string;
  actionText: string;
  onCloseModal: () => void;
  onClick: () => void;
}

export type { IDetailsCyclesModal };
