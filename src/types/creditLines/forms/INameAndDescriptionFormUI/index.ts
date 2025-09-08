import { FormikProps } from "formik";
import { INameAndDescriptionEntry } from "../INameAndDescriptionEntry";

interface INameAndDescriptionFormUI {
  formik: FormikProps<INameAndDescriptionEntry>;
}

export type { INameAndDescriptionFormUI };
