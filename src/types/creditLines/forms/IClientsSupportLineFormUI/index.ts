import { IDragAndDropColumn } from "@isettingkit/business-rules";
import { ISide } from "@ptypes/ISide";
import { INavigation } from "@ptypes/context/INavigation";
import { IPostCheckLineRule } from "@ptypes/creditLines/ISaveDataRequest";
interface IClientsSupportLineFormUI {
  optionsExcluded: IDragAndDropColumn;
  optionsIncluded: IDragAndDropColumn;
  showInfoModal: boolean;
  updateData: boolean;
  loading: boolean;
  navigation: INavigation;
  lineNameDecision: string;
  message: string;
  showUnconfiguredModal: boolean;
  unconfiguredRules: IPostCheckLineRule[];
  loadingData: boolean;
  language: string;
  title: string;
  description: string;
  optionCrumb: string;
  optionDetails: boolean;
  optionIcon: boolean;
  onUnconfiguredModal: () => void;
  onToggleUnconfiguredRules: () => void;
  onMove: (payload: { item: string; from: ISide; to: ISide }) => void;
  onOpenModal: () => void;
  onToggleInfoModal: () => void;
}

export type { IClientsSupportLineFormUI };
