import { IErrors } from "@ptypes/IErrors";

interface IUseModalAddDestination {
  showGoBackModal: boolean;
  loading: boolean;
  hasError: boolean;
  errorFetchRequest: boolean;
  errorData: IErrors;
  networkError: IErrors;
  handleCloseModal: () => void;
  handleGoBack: () => void;
  handleToggleErrorModal: () => void;
}

export type { IUseModalAddDestination };
