import { FormikProps } from "formik";
import { IDateVerification } from "../../../generalCredPolicies/forms/IDateVerification";

interface IUseDateVerificationForm {
  initialValues: IDateVerification;
  ref: React.ForwardedRef<FormikProps<IDateVerification>>;
  onSubmit: ((values: IDateVerification) => void) | undefined;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setDateVerification: React.Dispatch<
    React.SetStateAction<IDateVerification | undefined>
  >;
  loading?: boolean;
}

export type { IUseDateVerificationForm };
