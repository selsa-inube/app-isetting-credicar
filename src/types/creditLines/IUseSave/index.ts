import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

interface IUseSave {
  useCaseConfiguration: string;
  showRequestProcessModal: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  editData: ISaveDataRequest;
  setShowRequestProcessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSaveModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IUseSave };
