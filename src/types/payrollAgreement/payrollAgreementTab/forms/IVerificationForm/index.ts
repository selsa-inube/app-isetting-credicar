import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IFormsUpdateData } from "../IUpdateDataPayrollAg";

interface IVerificationForm {
  requestSteps: IRequestSteps[];
  showModal: boolean;
  showRequestProcessModal: boolean;
  updatedData: IFormsUpdateData;
  savePayrollAgreement: ISaveDataResponse;
  loading: boolean;
  showPendingReqModal: boolean;
  typeRegularPayroll: boolean;
  handleStepChange: (stepId: number) => void;
  onFinishForm: () => void;
  onPreviousStep: () => void;
  onToggleModal: () => void;
  onCloseRequestStatus: () => void;
  onClosePendingReqModal: () => void;
}

export type { IVerificationForm };
