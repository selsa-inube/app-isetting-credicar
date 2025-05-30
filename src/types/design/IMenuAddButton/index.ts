import { IMenuOptions } from "../IMenuOptions";

interface IMenuAddButton {
  showModal: boolean;
  showInfoModal: boolean;
  options: IMenuOptions[];
  onToggleInfoModal: () => void;
  onCloseMenu: () => void;
  onToggleModal: () => void;
}

export type { IMenuAddButton };
