import { IErrors } from "@ptypes/IErrors";

interface IUseModalDeleteDestination {
  loading: boolean;
  hasError: boolean;
  errorFetchRequest: boolean;
  errorData: IErrors;
  networkError: IErrors;
  showInfoModal: boolean;
  showModal: boolean;
  handleToggleInfoModal: () => void;
  handleClick: () => void;
  handleToggleModal: () => void;
  handleToggleErrorModal: () => void;
}

export type { IUseModalDeleteDestination };
