import { AxiosRequestConfig } from "axios";
import { translateObject } from "@isettingkit/business-rules";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { configTranslate, enviroment } from "@config/environment";
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

  const translatedRaw = await translateObject(
    data,
    enviroment.VITE_LANGUAGE,
    configTranslate,
  );

  const translatedArray = Array.isArray(translatedRaw)
    ? translatedRaw
    : Object.values(translatedRaw);

  return mapPayrollAgreementToEntities(translatedArray);
};

export { getPayrollAgreementData };
