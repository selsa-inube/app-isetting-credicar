import { AxiosRequestConfig } from "axios";
import { queryProcessAxiosInstance } from "@api/isettingProcess";
import { getWithRetries } from "@services/core/getWithRetries";
import { ILineUnderConstructionData } from "@ptypes/creditLines/ILineUnderConstructionData";
import { mapLineInConstructionToEntities } from "./mappers/mapLineInConstructionToEntities";

const getLineUnderConstruction = async (
  businessManagerCode: string,
  requestStatus: string,
): Promise<ILineUnderConstructionData[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllConfiguartionRequest",
    },
  };

  const queryParams = new URLSearchParams({
    businessManagerCode: businessManagerCode,
    requestStatus: requestStatus,
    page: ".1",
    per_page: ".1",
    sort: "desc.requestDate",
  });

  const data: ILineUnderConstructionData[] = await getWithRetries<
    ILineUnderConstructionData[]
  >(queryProcessAxiosInstance, `/requests?${queryParams}`, config);

  return mapLineInConstructionToEntities(data);
};

export { getLineUnderConstruction };
