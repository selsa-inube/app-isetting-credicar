import { AxiosRequestConfig } from "axios";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { deleteWithRetries } from "@services/core/deleteWithRetries";
import { IRequestPayrollAgre } from "@ptypes/payrollAgreement/RequestPayrollAgre/IRequestPayrollAgre/index.ts";
import { mapDeletePayrollnEntityToApi } from "./mappers";

const deletePayrollAgreement = async (
  userAcount: string,
  businessUnit: string,
  data: IRequestPayrollAgre,
  token: string,
): Promise<IRequestPayrollAgre> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "RemovePayrollForDeductionAgreement",
      "X-Business-Unit": businessUnit,
      "X-User-Name": userAcount,
      Authorization: token,
    },
  };

  const newData = await deleteWithRetries<IRequestPayrollAgre>(
    `/payroll-for-deduction-agreement`,
    config,
    mapDeletePayrollnEntityToApi(data) as unknown as string[],
    credicarAxiosInstance,
  );

  return newData;
};

export { deletePayrollAgreement };
