import { IErrors } from "@ptypes/IErrors";

interface IUseModalConfiguration {
  showGoBackModal: boolean;
  loading: boolean;
  hasError: boolean;
  errorData: IErrors;
  showSaveModal: boolean;
  loadingSendData: boolean;
  handleToggleSaveModal: () => void;
  handleSaveModal: () => void;
  handleCloseModal: () => void;
  handleGoBack: () => void;
  handleToggleErrorModal: () => void;
}

export type { IUseModalConfiguration };
