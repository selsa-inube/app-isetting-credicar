import { AxiosRequestConfig } from "axios";
import { queryProcessAxiosInstance } from "@api/isettingProcess";
import { getWithRetries } from "@services/core/getWithRetries";
import { EGeneral } from "@enum/general";
import { ILineUnderConstructionData } from "@ptypes/creditLines/ILineUnderConstructionData";
import { mapLineInConstructionToEntities } from "./mappers/mapLineInConstructionToEntities";

const getLineUnderConstruction = async (
  businessManagerCode: string,
  requestStatus: string,
  entity: string,
): Promise<ILineUnderConstructionData[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllConfigurationRequest",
    },
  };

  const queryParams = new URLSearchParams({
    businessManagerCode: businessManagerCode,
    requestStatus: requestStatus,
    applicationName: EGeneral.APPLICATION_NAME,
    entityName: entity,
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
