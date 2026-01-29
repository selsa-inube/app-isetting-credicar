import { IIconAppearance } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";
import { ReactNode } from "react";

interface IDecisionModal {
  actionText: string;
  portalId: string;
  description: string | ReactNode;
  title: string;
  onCloseModal: () => void;
  onClick?: () => void;
  subtitle?: string;
  withCancelButton?: boolean;
  moreDetails?: string;
  sizeIcon?: string;
  appearanceButton?: EComponentAppearance;
  icon?: React.JSX.Element;
  isDisabledButton?: boolean;
  withDate?: boolean;
  statusDate?: "pending" | "invalid" | undefined;
  loading?: boolean;
  withIcon?: boolean;
  appearance?: IIconAppearance;
  valueDate?: string;
  messageDate?: string;
  changeZIndex?: boolean;
  valueZIndex?: number;
  onBlurDate?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { IDecisionModal };
