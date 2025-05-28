import { IAssistedStep } from "@inubekit/inubekit";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IOrdinaryCyclesEntry } from "../forms/IOrdinaryCyclesEntry";
import { IAddPayrollAgreementForms } from "../forms/IAddPayrollAgreementForms";
import { IExtraordinaryCyclesEntry } from "../forms/IExtraordinaryCyclesEntry";
import { IAddPayrollAgreementRef } from "../forms/IAddPayrollAgreementRef";

interface IAddPayrollAgreementUI {
  currentStep: number;
  extraordinaryPayment: IExtraordinaryCyclesEntry[];
  formReferences: IAddPayrollAgreementRef;
  formValid: boolean;
  initialGeneralInformationValues: IAddPayrollAgreementForms;
  isCurrentFormValid: boolean;
  loading: boolean;
  regularPaymentCycles: IOrdinaryCyclesEntry[];
  requestSteps: IRequestSteps[];
  savePayrollAgreement: ISaveDataResponse;
  showGoBackModal: boolean;
  showModal: boolean;
  showPendingReqModal: boolean;
  showRequestProcessModal: boolean;
  smallScreen: boolean;
  sourcesOfIncomeValues: IServerDomain[];
  steps: IAssistedStep[];
  typeRegularPayroll: boolean;
  onToggleModal: () => void;
  setSourcesOfIncomeValues: React.Dispatch<
    React.SetStateAction<IServerDomain[]>
  >;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onGoBack: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  setExtraordinaryPayment: React.Dispatch<
    React.SetStateAction<IExtraordinaryCyclesEntry[]>
  >;
  setRegularPaymentCycles: React.Dispatch<
    React.SetStateAction<IOrdinaryCyclesEntry[]>
  >;
  onCloseRequestStatus: () => void;
  onClosePendingReqModal: () => void;
  onFinishForm: () => void;
  setCurrentStep: (step: number) => void;
}

export type { IAddPayrollAgreementUI };
