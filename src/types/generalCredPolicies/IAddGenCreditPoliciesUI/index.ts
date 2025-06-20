import { IAssistedStep } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IAddGenCredPoliciesRef } from "../forms/IAddGenCredPoliciesRef";
import { IAddGenCredPoliciesForms } from "../forms/IAddGenCredPoliciesForms";
import { IDateVerification } from "../forms/IDateVerification";

interface IAddGenCreditPoliciesUI {
  currentStep: number;
  formReferences: IAddGenCredPoliciesRef;
  formValid: boolean;
  initialValues: IAddGenCredPoliciesForms;
  smallScreen: boolean;
  steps: IAssistedStep[];
  contributionsPortfolio: IRuleDecision[];
  incomePortfolio: IRuleDecision[];
  scoreModels: IRuleDecision[];
  showModal: boolean;
  showRequestProcessModal: boolean;
  requestSteps: IRequestSteps[];
  saveGeneralPolicies: ISaveDataResponse;
  loading: boolean;
  showPendingReqModal: boolean;
  dateVerification: IDateVerification;
  showGoBackModal: boolean;
  onCloseGoBackModal: () => void;
  onGoBack: () => void;
  onOpenModal: () => void;
  setDateVerification: React.Dispatch<
    React.SetStateAction<IDateVerification | undefined>
  >;

  onCloseRequestStatus: () => void;
  onClosePendingReqModal: () => void;
  onFinishForm: () => void;
  setScoreModels: React.Dispatch<React.SetStateAction<IRuleDecision[]>>;
  setIncomePortfolio: React.Dispatch<React.SetStateAction<IRuleDecision[]>>;
  setContributionsPortfolio: React.Dispatch<
    React.SetStateAction<IRuleDecision[]>
  >;
  onToggleModal: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormValidChange: (isValid: boolean) => void;
  setCurrentStep: (step: number) => void;
  onCloseProcess: () => void;
}

export type { IAddGenCreditPoliciesUI };
