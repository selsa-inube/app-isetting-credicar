import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEnumerators } from "@ptypes/IEnumerators";
import { mapEnumToEntities } from "./mappers/mapEnumToEntities";

const getListPossibleValues = async (
  businessUnit: string,
  path: string,
  token: string,
): Promise<IEnumerators[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Business-unit": businessUnit,
      Authorization: token,
    },
  };

  const data: IEnumerators[] = await getWithRetries<IEnumerators[]>(
    credicarAxiosInstance,
    `${path}`,
    config,
  );

  return mapEnumToEntities(data);
};

export { getListPossibleValues };
