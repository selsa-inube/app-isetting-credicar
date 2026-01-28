import { IIconAppearance } from "@inubekit/inubekit";

interface IRequestStatusModal {
  portalId: string;
  title: string;
  actionText: string;
  description: string;
  loading: boolean;
  requestNumber: string;
  onClick: () => void;
  onCloseModal: () => void;
  appearance?: IIconAppearance;
  changeZIndex?: boolean;
}

export type { IRequestStatusModal };
