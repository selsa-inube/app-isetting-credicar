import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

interface IUseSavePayrollAgreement {
  bussinesUnits: string;
  userAccount: string;
  sendData: boolean;
  data: ISaveDataRequest;
  setSendData: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPendingReq?: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorFetchSaveData?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IUseSavePayrollAgreement };
