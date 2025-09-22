import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";

interface IFormsUpdateData {
  personalInformation: { isValid: boolean; values: IGeneralInformationEntry };
}

export type { IFormsUpdateData };
