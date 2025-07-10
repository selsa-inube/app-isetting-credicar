import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { IEnumerators } from "@ptypes/IEnumerators";
import { mapEnumToEntities } from "./mappers/mapEnumToEntities";
import { IEnumeratorsIncome } from "@ptypes/hooks/IEnumeratorsIncome";

const getEnumeratorsIncome = async (
  bussinesUnits: string,
): Promise<IEnumerators[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "GetAllEnumsIncomeType",
      "X-Business-unit": bussinesUnits,
    },
  };
  const data: IEnumeratorsIncome = await getWithRetries<IEnumeratorsIncome>(
    credicarAxiosInstance,
    `/enumerators-income-type`,
    config,
  );
  return mapEnumToEntities(data);
};

export { getEnumeratorsIncome };
