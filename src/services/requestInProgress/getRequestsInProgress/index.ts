import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { queryProcessAxiosInstance } from "@api/isettingQuery";
import { EGeneral } from "@enum/general";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { mapRequestsInProgressToEntities } from "./mappers/mapRequestsToEntities";

const getRequestsInProgress = async (
  businessManagerCode: string,
  businessUnit: string,
  entity: string,
  token: string,
  id?: string,
  requestNumber?: string,
): Promise<IRequestsInProgress[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchPendingConfigurationRequest",
      Authorization: token,
    },
  };

  const queryParamsObj: Record<string, string> = {
    businessManagerCode: businessManagerCode,
    businessUnitCode: businessUnit,
    applicationName: EGeneral.APPLICATION_NAME,
    entityName: entity,
    page: ".1",
    per_page: ".1",
    sort: "desc.requestDate",
  };

  if (id) {
    queryParamsObj.settingRequestId = id;
  }

  if (requestNumber) {
    queryParamsObj.requestNumber = requestNumber;
  }

  const queryParams = new URLSearchParams(queryParamsObj);
  const data = await getWithRetries<IRequestsInProgress[]>(
    queryProcessAxiosInstance,
    `/requests?${queryParams.toString()}`,
    config,
  );
  return Array.isArray(data) ? mapRequestsInProgressToEntities(data) : [];
};

export { getRequestsInProgress };
