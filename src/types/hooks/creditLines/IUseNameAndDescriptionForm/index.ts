import { FormikProps } from "formik";
import { INameAndDescriptionEntry } from "@ptypes/creditLines/forms/INameAndDescriptionEntry";

interface IUseNameAndDescriptionForm {
  initialValues: INameAndDescriptionEntry;
  ref: React.ForwardedRef<FormikProps<INameAndDescriptionEntry>>;
  loading: boolean | undefined;
  onSubmit: ((values: INameAndDescriptionEntry) => void) | undefined;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

export type { IUseNameAndDescriptionForm };
