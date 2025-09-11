import { FormikProps } from "formik";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { INameAndDescriptionEntry } from "../INameAndDescriptionEntry";

interface INameAndDescriptionFormUI {
  formik: FormikProps<INameAndDescriptionEntry>;
  showModal: boolean;
  showInfoModal: boolean;
  modalData: IModalData;
  onToggleInfoModal: () => void;
  onOpenModal: () => void;
}

export type { INameAndDescriptionFormUI };
