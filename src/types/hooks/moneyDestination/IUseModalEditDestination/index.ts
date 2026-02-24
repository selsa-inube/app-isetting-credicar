import { IErrors } from "@ptypes/IErrors";

interface IUseModalEditDestination {
  showGoBackModal: boolean;
  loading: boolean;
  hasError: boolean;
  errorFetchRequest: boolean;
  errorData: IErrors;
  networkError: IErrors;
  showEditedModal: boolean;
  descriptionError: IErrors;
  optionInProgress: boolean;
  request: string;
  handleToggleEditedModal: () => void;
  handleEditedModal: () => void;
  handleCloseGoBackModal: () => void;
  handleGoBack: () => void;
  handleToggleErrorModal: () => void;
  handleToggleErrorRuleModal: () => void;
  hasErrorRule?: boolean;
}

export type { IUseModalEditDestination };
