import { IModifyConstructionRequest } from "@ptypes/creditLines/IModifyConstructionRequest";

interface IUseLinesConstructionData {
  userAccount: string;
  withNeWData: boolean;
  linesData?: IModifyConstructionRequest;
  debounceMs?: number;
  saveOn?: string | number;
  setIsUpdated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IUseLinesConstructionData };
