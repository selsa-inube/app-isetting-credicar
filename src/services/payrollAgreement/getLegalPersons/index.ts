import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { ILegalPerson } from "@ptypes/payrollAgreement/payrollAgreementTab/ILegalPerson";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { mapLegalPersonsToEntities } from "./mappers/mapLegalPersonsToEntities";

const getLegalPersonsData = async (
  businessUnits: string,
): Promise<ILegalPerson[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllLegalPerson",
      "X-Business-unit": businessUnits,
    },
  };
  const data: ILegalPerson[] = await getWithRetries<ILegalPerson[]>(
    credicarAxiosInstance,
    `/legal-persons`,
    config,
  );
  return Array.isArray(data) ? mapLegalPersonsToEntities(data) : [];
};

export { getLegalPersonsData };
