import { AxiosRequestConfig } from "axios";
import { isaasQueryAxiosInstance } from "@api/isaasQuery";
import { getWithRetries } from "@services/core/getWithRetries";
import { IEnumerators } from "@ptypes/IEnumerators";
import { mapEnumToEntities } from "./mappers/mapEnumToEntities";

const getEnumeratorsIsaas = async (
  enumerator: string,
): Promise<IEnumerators[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetEnum",
    },
  };

  const queryParams = new URLSearchParams({
    country: "colombia",
  });

  const data: IEnumerators[] = await getWithRetries<IEnumerators[]>(
    isaasQueryAxiosInstance,
    `/enumerators/${enumerator}?${queryParams}`,
    config,
  );

  return mapEnumToEntities(data);
};

export { getEnumeratorsIsaas };
