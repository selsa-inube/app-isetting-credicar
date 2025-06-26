import { FormikProps } from "formik";
import { IDecisionsGeneralEntry } from "../IDecisionsGeneralEntry";

interface IDecisionsGeneralFormUI {
  editDataOption: boolean;
  formik: FormikProps<IDecisionsGeneralEntry>;
  loading: boolean;
  showInfoRefModal: boolean;
  showInfoMetModal: boolean;
  showInfoObligModal: boolean;
  isMobile: boolean;
  isDisabledButton: boolean;
  buttonLabel: string;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReferenceChange: (name: string, value: string) => void;
  onInfoRefModal: () => void;
  onInfoObligModal: () => void;
  onInfoMethodsModal: () => void;
  onButtonClick: () => void;
  onResetEdit?: () => void;
  onResetAdd?: () => void;
}

export type { IDecisionsGeneralFormUI };
