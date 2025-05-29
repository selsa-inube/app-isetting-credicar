import { ComponentAppearance } from "@enum/appearances";

interface IModalWrapper {
  children: React.ReactNode;
  isMobile?: boolean;
  labelActionButton: string;
  labelCloseModal: string;
  portalId: string;
  title: string;
  onClick: () => void;
  appearanceButton?: ComponentAppearance;
  iconBeforeButton?: React.ReactElement;
  labelCloseButton?: string;
  height?: string;
  width?: string;
  loading?: boolean;
  withCancelButton?: boolean;
  minHeight?: string;
  maxHeight?: string;
  disabledActionButton?: boolean;
  onCloseModal?: () => void;
}

export type { IModalWrapper };
