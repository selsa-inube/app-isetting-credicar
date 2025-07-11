import { IGeneralInformationEntry } from "@ptypes/creditLines/forms/IGeneralInformationEntry";
import { FormikProps } from "formik";

interface IGeneralInformationFormUI {
  formik: FormikProps<IGeneralInformationEntry>;
  onNextStep: () => void;
  loading?: boolean;
}

export type { IGeneralInformationFormUI };
