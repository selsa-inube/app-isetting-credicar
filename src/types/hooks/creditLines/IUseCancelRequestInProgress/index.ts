import { IEntry } from "@ptypes/design/table/IEntry";

interface IUseCancelRequestInProgress {
  businessUnit: string;
  useCaseCancel: string;
  data: IEntry;
  userAccount: string;
  setEntryCanceled: (id: string | number) => void;
  inConstruction?: boolean;
}

export type { IUseCancelRequestInProgress };
