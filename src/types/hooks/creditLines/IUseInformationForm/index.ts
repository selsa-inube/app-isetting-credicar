import { FormikProps } from "formik";
import { IInformationEntry } from "@ptypes/creditLines/forms/IInformationEntry";

interface IUseInformationForm {
  initialValues: IInformationEntry;
  ref: React.ForwardedRef<FormikProps<IInformationEntry>>;
  onSubmit: ((values: IInformationEntry) => void) | undefined;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

export type { IUseInformationForm };
