import { FormikProps } from "formik";
import { ICreditProspectEntry } from "@design/forms/creditProspect/types";
import { IEntry } from "@design/data/optionsPropectCredit/types";

interface ICreditProspectFormUI {
  formik: FormikProps<ICreditProspectEntry>;
  entries: IEntry[];
  additionalDebtorsField: boolean;
  isMobile: boolean;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onChange: (name: string, value: string) => void;
  onToggle: (id: string) => void;
  isFormValid: boolean;
  loading?: boolean;
}

export type { ICreditProspectFormUI };
