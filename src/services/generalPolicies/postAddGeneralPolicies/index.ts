import { AxiosRequestConfig } from "axios";
import { postWithRetries } from "@services/core/postWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IRequestGeneralPol } from "@ptypes/generalCredPolicies/IRequestGeneralPol";
import { mapAddPayrollnEntityToApi } from "./mappers";

const postAddGeneralPolicies = async (
  businessUnit: string,
  data: IRequestGeneralPol,
): Promise<IRequestGeneralPol> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "AddGeneralPortfolioPolicess",
      "X-Business-Unit": businessUnit,
    },
  };

  const newData = await postWithRetries<IRequestGeneralPol>(
    `/portfolio-policess`,
    config,
    mapAddPayrollnEntityToApi(data) as unknown as string[],
    credicarAxiosInstance,
  );

  return newData;
};

export { postAddGeneralPolicies };
