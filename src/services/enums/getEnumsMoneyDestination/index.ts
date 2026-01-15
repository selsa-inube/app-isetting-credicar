import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IEnumeratorsDestination } from "@ptypes/hooks/IEnumeratorsDestination";
import { mapEnumToEntities } from "./mappers/mapEnumToEntities";

const getEnumsMoneyDestination = async (
  businessUnits: string,
  token: string,
): Promise<IEnumerators[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetAllEnumsMoneyDestination",
      "X-Business-unit": businessUnits,
      Authorization: token,
    },
  };
  const data: IEnumeratorsDestination =
    await getWithRetries<IEnumeratorsDestination>(
      credicarAxiosInstance,
      `/enumerators-money-destination`,
      config,
    );
  return mapEnumToEntities(data);
};

export { getEnumsMoneyDestination };
