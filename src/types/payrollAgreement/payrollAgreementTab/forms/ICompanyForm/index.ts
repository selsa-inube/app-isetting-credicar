import { ICompanyEntry } from "../ICompanyEntry";

interface ICompanyForm {
  initialValues: ICompanyEntry;
  onButtonClick: () => void;
  editDataOption?: boolean;
  option?: boolean;
  loading?: boolean;
  initialCompanyData?: ICompanyEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ICompanyEntry) => void;
  onReset?: () => void;
}

export type { ICompanyForm };
