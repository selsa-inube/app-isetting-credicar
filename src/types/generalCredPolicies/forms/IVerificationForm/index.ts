import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { IUpdateDataGenPolicies } from "../IUpdateDataGenPolicies";
import { IDateVerification } from "../IDateVerification";

interface IVerificationForm {
  requestSteps: IRequestSteps[];
  showModal: boolean;
  showRequestProcessModal: boolean;
  updatedData: IUpdateDataGenPolicies;
  saveGeneralPolicies: ISaveDataResponse;
  loading: boolean;
  showPendingReqModal: boolean;
  date: IDateVerification;
  setDateVerification: React.Dispatch<
    React.SetStateAction<IDateVerification | undefined>
  >;
  handleStepChange: (stepId: number) => void;
  onFinishForm: () => void;
  onPreviousStep: () => void;
  onToggleModal: () => void;
  onCloseRequestStatus: () => void;
  onClosePendingReqModal: () => void;
}

export type { IVerificationForm };
