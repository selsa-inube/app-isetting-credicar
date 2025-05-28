import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";

interface IGeneralInformationForm {
  initialValues: IGeneralInformationEntry;
  onButtonClick: () => void;
  loading?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IGeneralInformationEntry) => void;
  editDataOption?: boolean;
  initialGeneralInfData?: IGeneralInformationEntry;
}

export type { IGeneralInformationForm };
