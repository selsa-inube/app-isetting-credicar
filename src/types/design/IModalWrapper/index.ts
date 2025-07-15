import { EComponentAppearance } from "@enum/appearances";

interface IModalWrapper {
  children: React.ReactNode;
  isMobile?: boolean;
  labelActionButton: string;
  labelCloseModal: string;
  portalId: string;
  title: string;
  onClick: () => void;
  appearanceButton?: EComponentAppearance;
  iconBeforeButton?: React.ReactElement;
  labelCloseButton?: string;
  height?: string;
  width?: string;
  loading?: boolean;
  withCancelButton?: boolean;
  minHeight?: string;
  maxHeight?: string;
  disabledActionButton?: boolean;
  padding?: string;
  onCloseModal?: () => void;
}

export type { IModalWrapper };
