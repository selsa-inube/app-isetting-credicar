import { FormikProps } from "formik";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { INavigation } from "@ptypes/context/INavigation";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { IPostCheckLineRule } from "@ptypes/creditLines/ISaveDataRequest";
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
  showUnconfiguredModal: boolean;
  unconfiguredRules: IPostCheckLineRule[];
  language: string;
  optionDetails: boolean;
  title: string;
  description: string;
  optionCrumb: string;
  disabledField: boolean;
  onUnconfiguredModal: () => void;
  onToggleUnconfiguredRules: () => void;
  onCloseRequestStatus: () => void;
  onClosePendingModal: () => void;
  onCloseProcess: () => void;
  onToggleInfoModal: () => void;
  onOpenModal: () => void;
}

export type { INameAndDescriptionFormUI };
