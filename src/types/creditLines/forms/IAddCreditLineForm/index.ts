import { IInformationEntry } from "../IInformationEntry";

interface IAddCreditLineForm {
  initialValues: IInformationEntry;
  isCurrentFormValid: boolean;
  onAddModal: () => void;
  onCloseModal: () => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IInformationEntry) => void;
  loading?: boolean;
}

export type { IAddCreditLineForm };
