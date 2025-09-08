import { INameAndDescriptionEntry } from "../INameAndDescriptionEntry";

interface INameAndDescriptionForm {
  initialValues: INameAndDescriptionEntry;
  onButtonClick: () => void;
  loading?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: INameAndDescriptionEntry) => void;
  onReset?: () => void;
  onPreviousStep?: () => void;
}

export type { INameAndDescriptionForm };
