import { IModifyConstructionRequest } from "@ptypes/creditLines/IModifyConstructionRequest";

interface IUseLinesConstructionData {
  userAccount: string;
  withNeWData: boolean;
  linesData?: IModifyConstructionRequest;
  debounceMs?: number;
  saveOn?: string | number;
}

export type { IUseLinesConstructionData };
