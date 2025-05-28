import { IRuleDecision } from "@isettingkit/input";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";

interface IFormsUpdateData {
  personalInformation: { isValid: boolean; values: IGeneralInformationEntry };
  creditline: { isValid: boolean; values: IRuleDecision[] };
}

export type { IFormsUpdateData };
