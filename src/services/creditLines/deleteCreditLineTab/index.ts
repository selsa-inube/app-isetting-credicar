import { AxiosRequestConfig } from "axios";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { deleteWithRetries } from "@services/core/deleteWithRetries";
import { IRequestCreditLine } from "@ptypes/creditLines/IRequestCreditLine";
import { mapDeleteCreditEntityToApi } from "./mappers";

const deleteCreditLineTab = async (
  userAcount: string,
  businessUnit: string,
  data: IRequestCreditLine,
): Promise<IRequestCreditLine> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "DeleteLineOfCredit",
      "X-Business-Unit": businessUnit,
      "X-User-Name": userAcount,
    },
  };

  const newData = await deleteWithRetries<IRequestCreditLine>(
    `/lines-of-credit`,
    config,
    mapDeleteCreditEntityToApi(data) as unknown as string[],
    credicarAxiosInstance,
  );

  return newData;
};

export { deleteCreditLineTab };
