import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { UseCase } from "@ptypes/requestInProgress/IUseCase";
import { IErrors } from "@ptypes/IErrors";
interface IUseRequest {
  setSendData: React.Dispatch<React.SetStateAction<boolean>>;
  useCase: UseCase;
  statusRequest: string;
  saveGeneralPolicies: ISaveDataResponse;
  errorFetchRequest: boolean;
  networkError: IErrors;
  setHasError: (value: React.SetStateAction<boolean>) => void;
}

export type { IUseRequest };
