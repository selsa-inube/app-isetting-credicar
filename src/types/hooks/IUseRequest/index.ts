import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { UseCase } from "@ptypes/requestInProgress/IUseCase";

interface IUseRequest {
  setSendData: React.Dispatch<React.SetStateAction<boolean>>;
  useCase: UseCase;
  statusRequest: string;
  saveGeneralPolicies: ISaveDataResponse;
  errorFetchRequest: boolean;
}

export type { IUseRequest };
