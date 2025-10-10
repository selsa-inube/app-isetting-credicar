import { IErrors } from "@ptypes/IErrors";

interface IUseModalDeleteCredit {
  loading: boolean;
  showInfoModal: boolean;
  showModal: boolean;
  hasError: boolean;
  errorData: IErrors;
  networkError: IErrors;
  errorFetchRequest: boolean;
  handleToggleErrorModal: () => void;
  handleToggleInfoModal: () => void;
  handleClick: () => void;
  handleToggleModal: () => void;
}

export type { IUseModalDeleteCredit };
