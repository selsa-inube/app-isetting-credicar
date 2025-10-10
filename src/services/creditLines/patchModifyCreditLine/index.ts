import { AxiosRequestConfig } from "axios";
import { patchWithRetries } from "@services/core/patchWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IModifyCreditLine } from "@ptypes/creditLines/IModifyCreditLine";
import { mappatchModifyCreditEntityToApi } from "./mappers";

const patchModifyCreditLine = async (
  businessUnits: string,
  userAccount: string,
  data: IModifyCreditLine,
): Promise<IModifyCreditLine> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "ModifyLineOfCredit",
      "X-User-Name": userAccount,
      "X-Business-unit": businessUnits,
    },
  };

  const saveData = await patchWithRetries<IModifyCreditLine>(
    `/lines-of-credit`,
    config,
    mappatchModifyCreditEntityToApi(data) as unknown as string[],
    credicarAxiosInstance,
  );

  return saveData;
};

export { patchModifyCreditLine };
