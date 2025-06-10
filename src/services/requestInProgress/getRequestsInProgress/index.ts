import { AxiosRequestConfig } from "axios";
import { translateObject } from "@isettingkit/business-rules";
import { getWithRetries } from "@services/core/getWithRetries";
import { queryProcessAxiosInstance } from "@api/isettingProcess";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IEnumerators } from "@ptypes/IEnumerators";
import { enviroment } from "@config/environment";
import { mapRequestsInProgressToEntities } from "./mappers/mapRequestsToEntities";

const getRequestsInProgress = async (
  bussinesUnits: string,
  entity: string,
  enumsRequests?: IEnumerators[],
): Promise<IRequestsInProgress[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchPendingConfigurationRequest",
      "X-Business-unit": bussinesUnits,
    },
  };

  const queryParams = new URLSearchParams({
    applicationName: "ifac",
    entityName: entity,
    page: ".1",
    per_page: ".1",
    sort: "desc.requestDate",
  });
  const data = await getWithRetries<IRequestsInProgress[]>(
    queryProcessAxiosInstance,
    `/requests/business-unit/${bussinesUnits}?${queryParams.toString()}`,
    config,
  );
  const translatedRaw = await translateObject(data, enviroment.VITE_LANGUAGE);

  const translatedArray = Array.isArray(translatedRaw)
    ? translatedRaw
    : Object.values(translatedRaw);

  return mapRequestsInProgressToEntities(translatedArray, enumsRequests);
};

export { getRequestsInProgress };
