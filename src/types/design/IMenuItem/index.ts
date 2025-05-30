interface IMenuItem {
  disabled: boolean;
  description: string;
  icon: React.JSX.Element;
  path: string;
  onToggleInfoModal: () => void;
  close?: boolean;
  onClose?: () => void;
}

export type { IMenuItem };
