import { FormikProps } from "formik";
import { IInformationEntry } from "../IInformationEntry";

interface IAddCreditLineFormUI {
  formik: FormikProps<IInformationEntry>;
  loading: boolean;
  disabledButton: boolean;
  onAddModal: () => void;
  onCloseModal: () => void;
}

export type { IAddCreditLineFormUI };
