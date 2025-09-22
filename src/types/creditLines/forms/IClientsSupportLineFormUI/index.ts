import { IDragAndDropColumn } from "@isettingkit/business-rules";
import { ISide } from "@ptypes/ISide";
interface IClientsSupportLineFormUI {
  optionsExcluded: IDragAndDropColumn;
  optionsIncluded: IDragAndDropColumn;
  showInfoModal: boolean;
  updateData: boolean;
  loading: boolean;
  onMove: (payload: { item: string; from: ISide; to: ISide }) => void;
  onOpenModal: () => void;
  onToggleInfoModal: () => void;
}

export type { IClientsSupportLineFormUI };
