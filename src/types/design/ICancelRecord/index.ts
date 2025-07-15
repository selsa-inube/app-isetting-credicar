import { IMessageModal } from "@ptypes/decisions/IMessageModal";
import { ERequestStatus } from "@enum/requestStatus";

interface ICancelRecord {
  showModal: boolean;
  messageCancel: IMessageModal;
  loading: boolean;
  status: ERequestStatus;
  onToggleModal: () => void;
  onClick: () => void;
}

export type { ICancelRecord };
