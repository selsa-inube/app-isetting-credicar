import { IMessageModal } from "../IMessageModal";

interface IDelete {
  showModal: boolean;
  messageDelete: IMessageModal;
  loading: boolean;
  onToggleModal: () => void;
  onClick: () => void;
  withActionMobile?: boolean;
}

export type { IDelete };
