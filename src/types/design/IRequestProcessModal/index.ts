import { IRequestSteps } from "../IRequestSteps";

interface IRequestProcessModal {
  portalId: string;
  requestSteps: IRequestSteps[];
  isMobile: boolean;
  title: string;
  description: string;
  sizeIcon?: string;
}

export type { IRequestProcessModal };
