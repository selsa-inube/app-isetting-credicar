import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { queryProcessAxiosInstance } from "@api/isettingProcess";
import { IRequestsInProgress } from "@ptypes/payrollAgreement/requestInProgTab/IRequestsInProgress";
import { mapRequestsInProgressToEntity } from "./mappers/mapRequestsInProgToEntity";

const getRequestInProgressById = async (
  businessUnits: string,
  settingRequestId: string,
): Promise<IRequestsInProgress> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchByIdConfigurationRequestsByBusinessUnit",
      "X-Business-unit": businessUnits,
    },
  };

  const queryParams = new URLSearchParams({
    applicationName: "ifac",
    entityName: "PayrollAgreement",
  });
  const data = await getWithRetries<IRequestsInProgress>(
    queryProcessAxiosInstance,
    `/requests/business-unit/${businessUnits}/${settingRequestId}?${queryParams.toString()}`,
    config,
  );
  return mapRequestsInProgressToEntity(data);
};

export { getRequestInProgressById };
