import { AxiosRequestConfig } from "axios";
import { patchWithRetries } from "@services/core/patchWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IRequestGeneralPol } from "@ptypes/generalCredPolicies/IRequestGeneralPol";
import { mapEditGeneralPoliciesToApi } from "./mappers";

const patchEditGeneralPolicies = async (
  businessUnit: string,
  user: string,
  data: IRequestGeneralPol,
  token: string,
): Promise<IRequestGeneralPol> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "ModifyGeneralPortfolioPolicies",
      "X-Business-Unit": businessUnit,
      "X-User-Name": user,
      Authorization: token,
    },
  };

  const newData = await patchWithRetries<IRequestGeneralPol>(
    `/portfolio-policies`,
    config,
    mapEditGeneralPoliciesToApi(data) as unknown as string[],
    credicarAxiosInstance,
  );

  return newData;
};

export { patchEditGeneralPolicies };
