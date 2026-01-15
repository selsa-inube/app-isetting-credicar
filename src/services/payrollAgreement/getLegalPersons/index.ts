import { AxiosRequestConfig } from "axios";
import { getWithRetries } from "@services/core/getWithRetries";
import { ILegalPerson } from "@ptypes/payrollAgreement/payrollAgreementTab/ILegalPerson";
import { credicarAxiosInstance } from "@api/isettingCredicar";
import { mapLegalPersonsToEntities } from "./mappers/mapLegalPersonsToEntities";

const getLegalPersonsData = async (
  businessUnits: string,
  token: string,
): Promise<ILegalPerson[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "X-Action": "SearchAllPayingEntity",
      "X-Business-unit": businessUnits,
      Authorization: token,
    },
  };
  const data: ILegalPerson[] = await getWithRetries<ILegalPerson[]>(
    credicarAxiosInstance,
    `/paying-entities`,
    config,
  );
  return Array.isArray(data) ? mapLegalPersonsToEntities(data) : [];
};

export { getLegalPersonsData };
