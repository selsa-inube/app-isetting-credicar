import { AxiosRequestConfig } from "axios";
import { postWithRetries } from "@services/core/postWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IRequestPayrollAgre } from "@ptypes/payrollAgreement/RequestPayrollAgre/IRequestPayrollAgre/index.ts";
import { mapAddPayrollnEntityToApi } from "./mappers";

const postAddPayrollAgre = async (
  businessUnit: string,
  data: IRequestPayrollAgre,
): Promise<IRequestPayrollAgre> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "AddPayrollForDeductionAgreement",
      "X-Business-Unit": businessUnit,
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

export { postAddPayrollAgre };
