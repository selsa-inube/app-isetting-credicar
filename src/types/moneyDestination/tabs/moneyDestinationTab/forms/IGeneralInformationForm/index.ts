import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { IServerDomain } from "@ptypes/IServerDomain";

interface IGeneralInformationForm {
  initialValues: IGeneralInformationEntry;
  creditLineValues: IServerDomain[];
  onButtonClick: () => void;
  setCreditLineValues: React.Dispatch<React.SetStateAction<IServerDomain[]>>;
  loading?: boolean;
  onReset?: () => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IGeneralInformationEntry) => void;
  editDataOption?: boolean;
  initialGeneralInfData?: IGeneralInformationEntry;
}

export type { IGeneralInformationForm };
