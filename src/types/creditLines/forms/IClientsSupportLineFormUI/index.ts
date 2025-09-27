import { IDragAndDropColumn } from "@isettingkit/business-rules";
import { ISide } from "@ptypes/ISide";
import { INavigation } from "@ptypes/context/INavigation";
interface IClientsSupportLineFormUI {
  optionsExcluded: IDragAndDropColumn;
  optionsIncluded: IDragAndDropColumn;
  showInfoModal: boolean;
  updateData: boolean;
  loading: boolean;
  navigation: INavigation;
  lineNameDecision: string;
  onMove: (payload: { item: string; from: ISide; to: ISide }) => void;
  onOpenModal: () => void;
  onToggleInfoModal: () => void;
}

export type { IClientsSupportLineFormUI };
