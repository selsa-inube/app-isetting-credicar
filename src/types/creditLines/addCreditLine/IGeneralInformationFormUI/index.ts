import { IGeneralInformationEntry } from "@ptypes/creditLines/forms/IGeneralInformationEntry";
import { FormikProps } from "formik";

interface IGeneralInformationFormUI {
  formik: FormikProps<IGeneralInformationEntry>;
  isMobile: boolean;
  onNextStep: () => void;
  loading?: boolean;
}

export type { IGeneralInformationFormUI };
