import { EUseCase } from "@enum/useCase";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

interface IUseSaveCreditlinesTab {
  useCase: EUseCase;
  businessUnits: string;
  userAccount: string;
  sendData: boolean;
  data: ISaveDataRequest;
  setSendData: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPendingReq?: React.Dispatch<React.SetStateAction<boolean>>;
  setEntryDeleted?: (id: string | number) => void;
}

export type { IUseSaveCreditlinesTab };
