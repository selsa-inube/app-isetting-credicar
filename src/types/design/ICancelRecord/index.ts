import { IMessageModal } from "@ptypes/decisions/IMessageModal";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";

interface ICancelRecord {
  showModal: boolean;
  messageCancel?: IMessageModal;
  loading: boolean;
  modalData: IModalData;
  showInfoModal?: boolean;
  onToggleInfoModal?: () => void;
  onToggleModal: () => void;
  onClick?: () => void;
}

export type { ICancelRecord };
