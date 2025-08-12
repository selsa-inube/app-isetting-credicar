import { IMessageModal } from "../IMessageModal";

interface IDelete {
  showModal: boolean;
  messageDelete: IMessageModal;
  loading: boolean;
  showInfoModal: boolean;
  onToggleInfoModal: () => void;
  onToggleModal: () => void;
  onClick: () => void;
  withActionMobile?: boolean;
}

export type { IDelete };
