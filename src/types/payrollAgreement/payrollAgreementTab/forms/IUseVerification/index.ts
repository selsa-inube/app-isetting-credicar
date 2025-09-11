import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IFormsUpdateData } from "../IUpdateDataPayrollAg";

interface IUseVerification {
  updatedData: IFormsUpdateData;
  showRequestProcessModal: boolean;
  savePayrollAgreement: ISaveDataResponse;
  typeRegularPayroll: boolean;
  showPendingRequestModal: boolean;
}

export type { IUseVerification };
