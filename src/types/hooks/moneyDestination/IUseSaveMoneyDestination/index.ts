import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

interface IUseSaveMoneyDestination {
  useCase: "add" | "edit" | "delete";
  businessUnits: string;
  userAccount: string;
  sendData: boolean;
  data: ISaveDataRequest;
  setSendData: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEntryDeleted?: (id: string | number) => void;
}

export type { IUseSaveMoneyDestination };
