import { IDragAndDropColumn } from "@isettingkit/business-rules";
import { ISide } from "@ptypes/ISide";
import { INavigation } from "@ptypes/context/INavigation";
import { ISubmitModalData } from "@ptypes/creditLines/ISubmitModalData";
interface IClientsSupportLineFormUI {
  optionsExcluded: IDragAndDropColumn;
  optionsIncluded: IDragAndDropColumn;
  showInfoModal: boolean;
  updateData: boolean;
  loading: boolean;
  navigation: INavigation;
  lineNameDecision: string;
  message: string;
  showSendModal: boolean;
  loadingData: boolean;
  language: string;
  title: string;
  description: string;
  optionCrumb: string;
  optionDetails: boolean;
  optionIcon: boolean;
  submitModalData: ISubmitModalData;
  editOption: boolean;
  showInfo: boolean;
  onMove: (payload: { item: string; from: ISide; to: ISide }) => void;
  onOpenModal: () => void;
  onToggleInfoModal: () => void;
}

export type { IClientsSupportLineFormUI };
