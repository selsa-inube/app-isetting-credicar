import { IRequestSteps } from "../IRequestSteps";

interface IRequestProcessModal {
  portalId: string;
  requestSteps: IRequestSteps[];
  isMobile: boolean;
  title: string;
  description: string;
  onClose: () => void;
  sizeIcon?: string;
}

export type { IRequestProcessModal };
