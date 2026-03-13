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
  creditBureausOptions: IServerDomain[];
  payrollAdvanceOptions: IServerDomain[];
  payrollSpecialAdvanceOptions: IServerDomain[];
  isLoadingEnums: boolean;
  handleChangeInquiry: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDocSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCreditBureaus: (_name: string, valueCSV: string) => void;
  onChange: (name: string, value: string) => void;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInfoRefModal: () => void;
  onInfoObligModal: () => void;
  onInfoMethodsModal: () => void;
  onButtonClick: () => void;
  onResetEdit?: () => void;
  onResetAdd?: () => void;
}

export type { IDecisionsGeneralFormUI };
