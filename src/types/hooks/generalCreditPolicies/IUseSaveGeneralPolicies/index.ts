import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

interface IUseSaveGeneralPolicies {
  useCase: "add" | "edit" | "delete";
  businessUnits: string;
  userAccount: string;
  sendData: boolean;
  data: ISaveDataRequest;
  token: string;
  optionRequest: boolean;
  id: string;
  setSendData: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEntryDeleted?: (id: string | number) => void;
  setProcessedModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IUseSaveGeneralPolicies };
