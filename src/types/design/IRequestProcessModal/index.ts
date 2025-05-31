import { IRequestSteps } from "@design/modals/requestProcessModal/types";

interface IRequestProcessModal {
  portalId: string;
  requestSteps: IRequestSteps[];
  isMobile: boolean;
  title: string;
  description: string;
  sizeIcon?: string;
}

export type { IRequestProcessModal };
