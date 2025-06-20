import { FormikProps } from "formik";
import { IDecisionsGeneralEntry } from "../IDecisionsGeneralEntry";

interface IDecisionsGeneralFormUI {
  editDataOption: boolean;
  formik: FormikProps<IDecisionsGeneralEntry>;
  loading: boolean;
  showModal: boolean;
  isMobile: boolean;
  isDisabledButton: boolean;
  buttonLabel: string;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReferenceChange: (name: string, value: string) => void;
  onInfoModal: () => void;
  onButtonClick: () => void;
  onResetEdit?: () => void;
  onResetAdd?: () => void;
}

export type { IDecisionsGeneralFormUI };
