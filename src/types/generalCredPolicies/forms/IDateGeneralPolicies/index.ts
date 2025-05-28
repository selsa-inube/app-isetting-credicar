import { FormikProps } from "formik";
import { IDateVerification } from "../IDateVerification";

interface IDateGeneralPolicies {
  formik: FormikProps<IDateVerification>;
  loading: boolean;
  isDisabledButton: boolean;
  onCloseModal: () => void;
  onFinishForm: () => void;
  onDateChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  withDate?: boolean;
}

export type { IDateGeneralPolicies };
