import { FormikProps } from "formik";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { IGeneralInformationEntry } from "../IGeneralInformationPayroll";

interface IGeneralInformationPayrollFormUI {
  autosuggestValue: string;
  editDataOption: boolean;
  formik: FormikProps<IGeneralInformationEntry>;
  loading: boolean;
  showModal: boolean;
  valuesEqual: boolean;
  isMobile: boolean;
  sourcesOfIncomeValues: IServerDomain[];
  typePayrollOptions: IServerDomain[];
  gridTemplateRows: string;
  labelButtonPrevious: string;
  labelButtonNext: string;
  showCodeModal: boolean;
  titleCodeModal: string;
  descriptionCodeModal: string;
  actionTextCodeModal: string;
  moreDetailsCode: string;
  modalData: IModalData;
  onToggleInfoTypeModal: () => void;
  onToggleCodeModal: () => void;
  onToggleInfoModalModal: () => void;
  onChangeCheck: (name: string, values: string) => void;
  onButtonClick: () => void;
  onChangeSelect: (name: string, value: string) => void;
  onChangeAutosuggest: (name: string, value: string) => void;
  onPreviousStep?: () => void;
  onResetEdit?: () => void;
  onResetAdd?: () => void;
  isDisabledButton?: boolean;
  companyAgreement?: string;
}

export type { IGeneralInformationPayrollFormUI };
