import { AxiosRequestConfig } from "axios";
import { IBusinessManagers } from "@ptypes/staffPortal/IBusinessManagers";
import { getWithRetries } from "@services/core/getWithRetries";
import { isaasQueryAxiosInstance } from "@api/isaasQuery";
import { mapBusinessManagerApiToEntity } from "./mappers";

const getBusinessManagers = async (
  publicCode: string,
): Promise<IBusinessManagers> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllBusinessManager",
    },
  };

  const queryParams = new URLSearchParams({
    publicCode: publicCode,
  });

  const data: IBusinessManagers[] = await getWithRetries<IBusinessManagers[]>(
    isaasQueryAxiosInstance,
    `/business-managers?${queryParams}`,
    config,
  );
  return mapBusinessManagerApiToEntity(data[0]);
};

export { getBusinessManagers };
