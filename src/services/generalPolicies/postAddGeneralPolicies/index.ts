import { AxiosRequestConfig } from "axios";
import { postWithRetries } from "@services/core/postWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IRequestGeneralPol } from "@ptypes/generalCredPolicies/IRequestGeneralPol";
import { mapAddPayrollnEntityToApi } from "./mappers";

const postAddGeneralPolicies = async (
  businessUnit: string,
  user: string,
  data: IRequestGeneralPol,
  token: string,
): Promise<IRequestGeneralPol> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "AddGeneralPortfolioPolicess",
      "X-Business-Unit": businessUnit,
      "X-User-Name": user,
      Authorization: token,
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
