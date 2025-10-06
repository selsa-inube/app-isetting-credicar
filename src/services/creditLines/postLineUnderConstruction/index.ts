import { AxiosRequestConfig } from "axios";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { postWithRetries } from "@services/core/postWithRetries";
import { IRequestPayrollAgre } from "@ptypes/payrollAgreement/RequestPayrollAgre/IRequestPayrollAgre/index.ts";
import { ILineUnderConstructionRequest } from "@ptypes/creditLines/ILineUnderConstructionRequest";
import { mapLineUnderConstructionEntityToApi } from "./mappers";

const postLineUnderConstruction = async (
  userAcount: string,
  businessUnit: string,
  data: ILineUnderConstructionRequest,
): Promise<IRequestPayrollAgre> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "AddLineOfCredit",
      "X-Business-Unit": businessUnit,
      "X-User-Name": userAcount,
    },
  };

  const newData = await postWithRetries<IRequestPayrollAgre>(
    `/lines-of-credit`,
    config,
    mapLineUnderConstructionEntityToApi(data) as unknown as string[],
    credicarAxiosInstance,
  );
  return newData;
};

export { postLineUnderConstruction };
