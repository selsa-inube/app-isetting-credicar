import { IIconAppearance } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";

interface IModalData {
  title: string;
  description: string;
  actionText: string;
  withCancelButton: boolean;
  onCloseModal: () => void;
  onClick: () => void;
  subtitle?: string;
  appearance?: IIconAppearance;
  appearanceButton?: EComponentAppearance;
  withIcon?: boolean;
  icon?: React.JSX.Element;
  moreDetails?: string;
  loading?: boolean;
}

export type { IModalData };
