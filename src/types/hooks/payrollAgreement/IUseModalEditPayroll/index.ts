import { IErrors } from "@ptypes/IErrors";

interface IUseModalEditPayroll {
  showGoBackModal: boolean;
  loading: boolean;
  hasError: boolean;
  errorFetchRequest: boolean;
  errorData: IErrors;
  networkError: IErrors;
  showEditedModal: boolean;
  loadingSendData: boolean;
  showDeletedAlertModal: boolean;
  typePayroll: string;
  handleToggleDeletedAlertModal: () => void;
  handleToggleEditedModal: () => void;
  handleEditedModal: () => void;
  handleCloseGoBackModal: () => void;
  handleGoBack: () => void;
  handleToggleErrorModal: () => void;
}

export type { IUseModalEditPayroll };
