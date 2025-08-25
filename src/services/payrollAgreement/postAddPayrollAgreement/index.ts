import { AxiosRequestConfig } from "axios";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { postWithRetries } from "@services/core/postWithRetries";
import { IRequestPayrollAgre } from "@ptypes/payrollAgreement/RequestPayrollAgre/IRequestPayrollAgre/index.ts";
import { mapAddPayrollnEntityToApi } from "./mappers";

const postAddPayrollAgreement = async (
  userAcount: string,
  businessUnit: string,
  data: IRequestPayrollAgre,
): Promise<IRequestPayrollAgre> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "AddPayrollForDeductionAgreement",
      "X-Business-Unit": businessUnit,
      "X-User-Name": userAcount,
    },
  };

  const newData = await postWithRetries<IRequestPayrollAgre>(
    `/payroll-for-deduction-agreement`,
    config,
    mapAddPayrollnEntityToApi(data) as unknown as string[],
    credicarAxiosInstance,
  );
  return newData;
};

export { postAddPayrollAgreement };
