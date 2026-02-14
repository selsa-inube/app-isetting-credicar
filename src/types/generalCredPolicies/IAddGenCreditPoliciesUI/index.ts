import { IAssistedStep } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { IOptionsGenDecision } from "@ptypes/hooks/generalCreditPolicies/IOptionsGenDecision";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IAddGenCredPoliciesRef } from "../forms/IAddGenCredPoliciesRef";
import { IAddGenCredPoliciesForms } from "../forms/IAddGenCredPoliciesForms";
import { IDateVerification } from "../forms/IDateVerification";
import { IModalData } from "../IModalData";
import { IRuleState } from "../IRuleState";

interface IAddGenCreditPoliciesUI {
  currentStep: number;
  formReferences: IAddGenCredPoliciesRef;
  formValid: boolean;
  initialValues: IAddGenCredPoliciesForms;
  smallScreen: boolean;
  steps: IAssistedStep[];
  showModal: boolean;
  showRequestProcessModal: boolean;
  requestSteps: IRequestSteps[];
  saveGeneralPolicies: ISaveDataResponse;
  loading: boolean;
  showPendingReqModal: boolean;
  dateVerification: IDateVerification;
  modalData: IModalData;
  showDecision: boolean;
  disabledButton: boolean;
  rulesData: IRuleState;
  optionsGenDecision: IOptionsGenDecision;
  setOptionsGenDecision: React.Dispatch<
    React.SetStateAction<IOptionsGenDecision>
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDecisionData: React.Dispatch<React.SetStateAction<IRuleDecision[] | any>>;
  onOpenModal: () => void;
  setDateVerification: React.Dispatch<
    React.SetStateAction<IDateVerification | undefined>
  >;
  onCloseRequestStatus: () => void;
  onClosePendingReqModal: () => void;
  onFinishForm: () => void;
  onToggleModal: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormValidChange: (isValid: boolean) => void;
  setCurrentStep: (step: number) => void;
  onCloseProcess: () => void;
}

export type { IAddGenCreditPoliciesUI };
