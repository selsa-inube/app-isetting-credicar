import { IFormsUpdateData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IFormsUpdateData";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";

interface IVerificationForm {
  requestSteps: IRequestSteps[];
  showModal: boolean;
  showRequestProcessModal: boolean;
  updatedData: IFormsUpdateData;
  saveMoneyDestination: ISaveDataResponse;
  loading: boolean;
  showPendingReqModal: boolean;
  handleStepChange: (stepId: number) => void;
  onFinishForm: () => void;
  onPreviousStep: () => void;
  onToggleModal: () => void;
  onCloseRequestStatus: () => void;
  onCloseProcess: () => void;
  onClosePendingReqModal: () => void;
}

export type { IVerificationForm };
