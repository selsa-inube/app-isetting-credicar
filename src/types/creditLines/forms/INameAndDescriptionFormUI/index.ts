import { FormikProps } from "formik";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { INavigation } from "@ptypes/context/INavigation";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { ISubmitModalData } from "@ptypes/creditLines/ISubmitModalData";
import { INameAndDescriptionEntry } from "../INameAndDescriptionEntry";

interface INameAndDescriptionFormUI {
  formik: FormikProps<INameAndDescriptionEntry>;
  showModal: boolean;
  showInfoModal: boolean;
  modalData: IModalData;
  loading: boolean;
  lineName: string;
  isUpdated: boolean;
  navigation: INavigation;
  message: string;
  saveData: ISaveDataResponse;
  requestSteps: IRequestSteps[];
  showRequestProcessModal: boolean;
  showRequestStatusModal: boolean;
  language: string;
  optionDetails: boolean;
  optionIcon: boolean;
  title: string;
  description: string;
  optionCrumb: string;
  disabledField: boolean;
  showSendModal: boolean;
  submitModalData: ISubmitModalData;
  editOption: boolean;
  onCloseRequestStatus: () => void;
  onClosePendingModal: () => void;
  onCloseProcess: () => void;
  onToggleInfoModal: () => void;
  onOpenModal: () => void;
}

export type { INameAndDescriptionFormUI };
