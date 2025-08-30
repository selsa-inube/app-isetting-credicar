import { IErrors } from "@ptypes/IErrors";

interface IUseModalEditDestination {
  showGoBackModal: boolean;
  loading: boolean;
  hasError: boolean;
  errorFetchRequest: boolean;
  errorData: IErrors;
  networkError: IErrors;
  showEditedModal: boolean;
  handleToggleEditedModal: () => void;
  handleEditedModal: () => void;
  handleCloseGoBackModal: () => void;
  handleGoBack: () => void;
  handleToggleErrorModal: () => void;
}

export type { IUseModalEditDestination };
