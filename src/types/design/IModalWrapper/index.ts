import { IButtonVariant, ITextSize, ITextType } from "@inubekit/inubekit";
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
  subtitle?: string;
  typeTitle?: ITextType;
  sizeTitle?: ITextSize;
  borderRadius?: string;
  dashed?: boolean;
  variantCancel?: IButtonVariant;
  weightTitle?: "normal" | "bold";
  withThirdButton?: boolean;
  appearanceThirdButton?: EComponentAppearance;
  labelThirdButton?: string;
  iconThirdButton?: React.ReactElement;
  loadingThirdButton?: boolean;
  fullwidthbutton?: boolean;
  onClickThirdButton?: () => void;
  onCloseModal?: () => void;
}

export type { IModalWrapper };
