import { FormikProps } from "formik";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";

interface IUseOrdinaryCyclesForm {
  ref: React.ForwardedRef<FormikProps<IOrdinaryCyclesEntry>>;
  editDataOption: boolean;
  loading: boolean | undefined;
  onSubmit: ((values: IOrdinaryCyclesEntry) => void) | undefined;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  regularPaymentCycles: IOrdinaryCyclesEntry[];
  setRegularPaymentCycles: React.Dispatch<
    React.SetStateAction<IOrdinaryCyclesEntry[]>
  >;
  initialData?: IOrdinaryCyclesEntry[];
}

export type { IUseOrdinaryCyclesForm };
