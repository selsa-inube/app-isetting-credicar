import { IMenuOptions } from "../IMenuOptions";

interface IMenu {
  options: IMenuOptions[];
  onToggleInfoModal: () => void;
  close?: boolean;
  onClose: () => void;
}

export type { IMenu };
