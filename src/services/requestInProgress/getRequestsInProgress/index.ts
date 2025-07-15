import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { queryProcessAxiosInstance } from "@api/isettingProcess";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { mapRequestsInProgressToEntities } from "./mappers/mapRequestsToEntities";

const getRequestsInProgress = async (
  businessUnits: string,
  entity: string,
): Promise<IRequestsInProgress[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchPendingConfigurationRequest",
      "X-Business-unit": businessUnits,
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
    `/requests/business-unit/${businessUnits}?${queryParams.toString()}`,
    config,
  );
  return Array.isArray(data) ? mapRequestsInProgressToEntities(data) : [];
};

export { getRequestsInProgress };
