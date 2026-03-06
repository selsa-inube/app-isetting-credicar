import { IErrors } from "@ptypes/IErrors";

interface IUseModalAddGeneral {
  showGoBackModal: boolean;
  loading: boolean;
  hasError: boolean;
  errorFetchRequest: boolean;
  errorData: IErrors;
  networkError: IErrors;
  processedModal: boolean;
  handleProcessed: () => void;
  handleCloseProcessed: () => void;
  handleCloseModal: () => void;
  handleGoBack: () => void;
  handleToggleErrorModal: () => void;
}

export type { IUseModalAddGeneral };
