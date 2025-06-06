import { IEntry } from "@ptypes/design/table/IEntry";

interface IUseCancelRequestInProgress {
  businessUnit: string;
  data: IEntry;
  userAccount: string;
  setEntryCanceled: (id: string | number) => void;
}

export type { IUseCancelRequestInProgress };
