import { IModifyConstructionRequest } from "@ptypes/creditLines/IModifyConstructionRequest";

interface IUseLinesConstructionData {
  userAccount: string;
  withNeWData: boolean;
  linesData?: IModifyConstructionRequest;
}

export type { IUseLinesConstructionData };
