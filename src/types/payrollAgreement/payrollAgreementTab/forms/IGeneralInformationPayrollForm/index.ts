import { IServerDomain } from "@ptypes/IServerDomain";
import { IGeneralInformationEntry } from "../IGeneralInformationPayroll";

interface IGeneralInformationPayrollForm {
  initialValues: IGeneralInformationEntry;
  sourcesOfIncomeValues: IServerDomain[];
  setSourcesOfIncomeValues: React.Dispatch<
    React.SetStateAction<IServerDomain[]>
  >;
  onButtonClick: () => void;
  loading?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IGeneralInformationEntry) => void;
  onReset?: () => void;
  onPreviousStep?: () => void;
  editDataOption?: boolean;
  initialGeneralInfData?: IGeneralInformationEntry;
  companyAgreement?: string;
}

export type { IGeneralInformationPayrollForm };
