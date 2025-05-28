import { ICompanyEntry } from "../ICompanyEntry";

interface ICompanyForm {
  initialValues: ICompanyEntry;
  onButtonClick: () => void;
  loading?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ICompanyEntry) => void;
}

export type { ICompanyForm };
