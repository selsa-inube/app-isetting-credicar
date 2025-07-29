import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";

interface IUseRequest {
  setSendData: React.Dispatch<React.SetStateAction<boolean>>;
  useCase: "add" | "edit" | "delete";
  statusRequest: string;
  saveGeneralPolicies: ISaveDataResponse;
  errorFetchRequest: boolean;
}

export type { IUseRequest };
