import { FormikProps } from "formik";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IDecisionsGeneralEntry } from "../IDecisionsGeneralEntry";

interface IDecisionsGeneralFormUI {
  editDataOption: boolean;
  formik: FormikProps<IDecisionsGeneralEntry>;
  loading: boolean;
  showInformationReferenceModal: boolean;
  showInformationMethodModal: boolean;
  showInformationObligationModal: boolean;
  isMobile: boolean;
  isDisabledButton: boolean;
  buttonLabel: string;
  methodsOptions: IServerDomain[];
  payrollAdvanceOptions: IServerDomain[];
  payrollSpecialAdvanceOptions: IServerDomain[];
  isLoadingEnums: boolean;
  onChangePayrollAdvance: (_name: string, valueCSV: string) => void;
  onChangePayrollSpecialAdvance: (_name: string, valueCSV: string) => void;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInfoRefModal: () => void;
  onInfoObligModal: () => void;
  onInfoMethodsModal: () => void;
  onButtonClick: () => void;
  onResetEdit?: () => void;
  onResetAdd?: () => void;
}

export type { IDecisionsGeneralFormUI };
