import { IErrors } from "@ptypes/IErrors";

interface IUseModalConfiguration {
  showGoBackModal: boolean;
  loading: boolean;
  hasError: boolean;
  errorData: IErrors;
  handleCloseModal: () => void;
  handleGoBack: () => void;
  handleToggleErrorModal: () => void;
}

export type { IUseModalConfiguration };
