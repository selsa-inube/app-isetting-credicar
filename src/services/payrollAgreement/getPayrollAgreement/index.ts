import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";
import { mapPayrollAgreementToEntities } from "./mappers/mapPayrollAgreementToEntities";

const getPayrollAgreementData = async (
  bussinesUnits: string,
): Promise<IPayrollAgreementData[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllPayrollForDeductionAgreement",
      "X-Business-unit": bussinesUnits,
    },
  };
  const data: IPayrollAgreementData[] = await getWithRetries<
    IPayrollAgreementData[]
  >(credicarAxiosInstance, `/payroll-for-deduction-agreement`, config);
  return Array.isArray(data) ? mapPayrollAgreementToEntities(data) : [];
};

export { getPayrollAgreementData };
