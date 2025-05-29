import { IExtraordinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryCyclesEntry";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";
import { FormikProps } from "formik";

interface IUseExtraordinaryCyclesForm {
  ref: React.ForwardedRef<FormikProps<IExtraordinaryCyclesEntry>>;
  editDataOption: boolean;
  typeRegularPayroll: boolean;
  loading: boolean | undefined;
  onSubmit: ((values: IExtraordinaryCyclesEntry) => void) | undefined;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  extraordinaryPayment: IExtraordinaryCyclesEntry[];
  regularDeleted: IOrdinaryCyclesEntry[];
  setExtraordinaryPayment: React.Dispatch<
    React.SetStateAction<IExtraordinaryCyclesEntry[]>
  >;
  regularPaymentCycles?: IOrdinaryCyclesEntry[];
  initialData?: IExtraordinaryCyclesEntry[];
}

export type { IUseExtraordinaryCyclesForm };
