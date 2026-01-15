import { AxiosRequestConfig } from "axios";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { patchWithRetries } from "@services/core/patchWithRetries";
import { IRequestPayrollAgre } from "@ptypes/payrollAgreement/RequestPayrollAgre/IRequestPayrollAgre/index.ts";
import { mapEditPayrollnEntityToApi } from "./mappers";

const pacthEditPayrollAgreement = async (
  userAcount: string,
  businessUnit: string,
  data: IRequestPayrollAgre,
  token: string,
): Promise<IRequestPayrollAgre> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "ModifyPayrollForDeductionAgreement",
      "X-Business-Unit": businessUnit,
      "X-User-Name": userAcount,
      Authorization: token,
    },
  };

  const newData = await patchWithRetries<IRequestPayrollAgre>(
    `/payroll-for-deduction-agreement`,
    config,
    mapEditPayrollnEntityToApi(data) as unknown as string[],
    credicarAxiosInstance,
  );

  return newData;
};

export { pacthEditPayrollAgreement };
