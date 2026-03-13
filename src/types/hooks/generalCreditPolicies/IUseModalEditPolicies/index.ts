import { IErrors } from "@ptypes/IErrors";

interface IUseModalEditPolicies {
  showGoBackModal: boolean;
  loading: boolean;
  hasError: boolean;
  errorFetchRequest: boolean;
  errorData: IErrors;
  networkError: IErrors;
  loadingSendData: boolean;
  showInfoModal: boolean;
  showDateModal: boolean;
  processedModal: boolean;
  handleCloseProcessed: () => void;
  handleProcessed: () => void;
  handleToggleDateModal: () => void;
  handleToggleInfoModal: () => void;
  handleFinishForm: () => void;
  handleCloseGoBackModal: () => void;
  handleGoBack: () => void;
  handleToggleErrorModal: () => void;
}

export type { IUseModalEditPolicies };
