import { IRequestSteps } from "../IRequestSteps";

interface IRequestProcess {
  requestSteps: IRequestSteps[];
  sizeIcon: string;
  stepCurrent: number;
  stepCurrentIndex: number;
}

export type { IRequestProcess };
