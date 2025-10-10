import { IErrors } from "@ptypes/IErrors";

interface IUseModalConfiguration {
  showGoBackModal: boolean;
  loading: boolean;
  hasError: boolean;
  errorData: IErrors;
  showSaveModal: boolean;
  loadingSendData: boolean;
  hasErrorRequest: boolean;
  networkError: IErrors;
  errorFetchRequest: boolean;
  showInfoErrorModal: boolean;
  hasErrorCheck: boolean;
  errorCheckData: IErrors;
  ruleLoadding: boolean;
  ruleError: boolean;
  ruleErrorData: IErrors;
  handleClickInfo: () => void;
  handleToggleSaveModal: () => void;
  handleSaveModal: () => void;
  handleCloseModal: () => void;
  handleGoBack: () => void;
  handleToggleErrorModal: () => void;
  handleToggleErrorSaveModal: () => void;
}

export type { IUseModalConfiguration };
