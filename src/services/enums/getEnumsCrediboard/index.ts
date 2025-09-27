import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEnumeratorsCrediboard } from "@ptypes/hooks/IEnumeratorsCrediboard";
import { IEnumerators } from "@ptypes/IEnumerators";
import { mapEnumToEntities } from "./mappers/mapEnumToEntities";

const getEnumsCrediboard = async (
  businessUnits: string,
  enumQuery: string,
): Promise<IEnumerators[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetAllEnums",
      "X-Business-unit": businessUnits,
    },
  };

  const queryParams = new URLSearchParams({
    enums: enumQuery,
  });
  const data: IEnumeratorsCrediboard =
    await getWithRetries<IEnumeratorsCrediboard>(
      credicarAxiosInstance,
      `/enumerators-crediboard?${queryParams}`,
      config,
    );
  const dataByEnum = data?.[enumQuery];

  return mapEnumToEntities(dataByEnum);
};

export { getEnumsCrediboard };
