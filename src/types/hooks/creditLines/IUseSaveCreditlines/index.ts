import { EUseCase } from "@enum/useCase";
import { IModifyConstructionRequest } from "@ptypes/creditLines/IModifyConstructionRequest";

interface IUseSaveCreditlines {
  useCase: EUseCase;
  businessUnits: string;
  userAccount: string;
  sendData: boolean;
  data: IModifyConstructionRequest;
  token: string;
  setSendData: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEntryDeleted?: (id: string | number) => void;
}

export type { IUseSaveCreditlines };
