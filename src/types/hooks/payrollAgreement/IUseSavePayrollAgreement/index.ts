import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

interface IUseSavePayrollAgreement {
  bussinesUnits: string;
  useCase: "add" | "edit" | "delete";
  userAccount: string;
  sendData: boolean;
  data: ISaveDataRequest;
  setSendData: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPendingReq?: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorFetchSaveData?: React.Dispatch<React.SetStateAction<boolean>>;
  setEntryDeleted?: (id: string | number) => void;
}

export type { IUseSavePayrollAgreement };
