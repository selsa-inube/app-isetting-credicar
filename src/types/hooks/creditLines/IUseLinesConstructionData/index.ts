import { IModifyConstructionRequest } from "@ptypes/creditLines/IModifyConstructionRequest";

interface IUseLinesConstructionData {
  option: string;
  userAccount: string;
  withNeWData: boolean;
  linesData?: IModifyConstructionRequest;
  debounceMs?: number;
  saveOn?: string | number;
  token: string;
  setIsUpdated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IUseLinesConstructionData };
