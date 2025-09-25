import { IEntry } from "@ptypes/design/table/IEntry";
import { IErrors } from "@ptypes/IErrors";

interface IUseRequestDetails {
  data: IEntry;
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorData: React.Dispatch<React.SetStateAction<IErrors>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchRequestData: () => Promise<void>;
}

export type { IUseRequestDetails };
