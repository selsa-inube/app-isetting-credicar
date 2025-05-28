import { IIconAppearance } from "@inubekit/inubekit";
import { ComponentAppearance } from "@enum/appearances";

interface IDecisionModal {
  actionText: string;
  portalId: string;
  description: string;
  title: string;
  onClick: () => void;
  onCloseModal: () => void;
  withCancelButton?: boolean;
  moreDetails?: string;
  sizeIcon?: string;
  appearanceButton?: ComponentAppearance;
  icon?: React.JSX.Element;
  isDisabledButton?: boolean;
  withDate?: boolean;
  statusDate?: "pending" | "invalid" | undefined;
  loading?: boolean;
  withIcon?: boolean;
  appearance?: IIconAppearance;
  valueDate?: string;
  messageDate?: string;
  onBlurDate?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { IDecisionModal };
