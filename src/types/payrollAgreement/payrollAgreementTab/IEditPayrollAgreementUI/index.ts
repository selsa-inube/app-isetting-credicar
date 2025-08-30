import { ITab } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { IServerDomain } from "@ptypes/IServerDomain";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { IOrdinaryCyclesEntry } from "../forms/IOrdinaryCyclesEntry";
import { IExtraordinaryCyclesEntry } from "../forms/IExtraordinaryCyclesEntry";
import { IGeneralInformationEntry } from "../forms/IGeneralInformationPayroll";
import { IEditPayrollAgreementForms } from "../forms/IEditPayrollAgreementForms";

interface IEditPayrollAgreementUI {
  isSelected: string;
  onTabChange: (id: string) => void;
  formReferences: React.RefObject<FormikProps<IGeneralInformationEntry>>;
  formValues: IEditPayrollAgreementForms;
  initialValues: IEditPayrollAgreementForms;
  smallScreen: boolean;
  sourcesOfIncomeValues: IServerDomain[];
  companyAgreement: string;
  showRequestProcessModal: boolean;
  savePayrollAgreement: ISaveDataResponse;
  requestSteps: IRequestSteps[];
  typeRegularPayroll: boolean;
  regularPaymentCycles: IOrdinaryCyclesEntry[];
  extraordinaryPayment: IExtraordinaryCyclesEntry[];
  showRegularPaymentCyclesForm: boolean;
  showExtraPaymentCyclesForm: boolean;
  showGeneralInfPayrollForm: boolean;
  showRequestStatus: string | false | undefined;
  filteredTabs: ITab[];
  titleRequest: string;
  descriptionRequest: string;
  actionTextRequest: string;
  showDecision: boolean;
  modalData: IModalData;
  setIncludeExtraPayDay: React.Dispatch<
    React.SetStateAction<IOrdinaryCyclesEntry[]>
  >;
  setRegularDeleted: React.Dispatch<
    React.SetStateAction<IOrdinaryCyclesEntry[]>
  >;
  setExtraordinaryPayment: React.Dispatch<
    React.SetStateAction<IExtraordinaryCyclesEntry[]>
  >;
  setRegularPaymentCycles: React.Dispatch<
    React.SetStateAction<IOrdinaryCyclesEntry[]>
  >;
  setSourcesOfIncomeValues: React.Dispatch<
    React.SetStateAction<IServerDomain[]>
  >;
  handleOpenModal: () => void;
  onReset: () => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseRequestStatus: () => void;
  onClosePendingRequestModal: () => void;
  onToggleEditedModal: () => void;
  onCloseProcess: () => void;
}

export type { IEditPayrollAgreementUI };
