import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IEnumeratorsDestination } from "@ptypes/hooks/IEnumeratorsDestination";
import { mapEnumToEntities } from "./mappers/mapEnumToEntities";

const getEnumsMoneyDestination = async (
  bussinesUnits: string,
): Promise<IEnumerators[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetAllEnumsMoneyDestination",
      "X-Business-unit": bussinesUnits,
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
