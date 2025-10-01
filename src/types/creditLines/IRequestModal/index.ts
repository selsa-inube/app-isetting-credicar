import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";

interface IRequestModal {
  showRequestProcessModal: boolean;
  showRequestStatusModal: boolean;
  saveData: ISaveDataResponse;
  requestSteps: IRequestSteps[];
  onCloseRequestStatus: () => void;
  onCloseProcess: () => void;
  onClosePendingModal: () => void;
}

export type { IRequestModal };
