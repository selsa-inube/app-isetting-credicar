import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";
import { mapPayrollAgreementToEntities } from "./mappers/mapPayrollAgreementToEntities";

const getPayrollAgreementData = async (
  businessUnits: string,
): Promise<IPayrollAgreementData[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllPayrollForDeductionAgreement",
      "X-Business-unit": businessUnits,
    },
  };
  const data: IPayrollAgreementData[] = await getWithRetries<
    IPayrollAgreementData[]
  >(credicarAxiosInstance, `/payroll-for-deduction-agreement`, config);

  return data ? mapPayrollAgreementToEntities(data) : [];
};

export { getPayrollAgreementData };
