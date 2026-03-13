import { ITextSize } from "@inubekit/inubekit";

interface ITitleOfDecisions {
  title: string;
  loading: boolean;
  lineName?: string;
  lineType?: string;
  description?: string;
  icon?: React.ReactNode;
  navigatePage?: string;
  sizeTitle?: ITextSize;
  onClick?: () => void;
  onToggleInfoModal?: () => void;
}

export type { ITitleOfDecisions };
