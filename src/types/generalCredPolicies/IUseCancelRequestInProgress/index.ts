import { IEntry } from "@ptypes/design/table/IEntry";

interface IUseCancelRequestInProgress {
  businessUnit: string;
  data: IEntry;
  userAccount: string;
  useCaseCancel: string;
  token: string;
  setEntryCanceled: (id: string | number) => void;
}

export type { IUseCancelRequestInProgress };
