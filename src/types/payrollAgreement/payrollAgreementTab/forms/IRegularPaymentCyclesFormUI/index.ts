import { FormikProps } from "formik";

import { IServerDomain } from "@ptypes/IServerDomain";
import { IMessageModal } from "@ptypes/design/IMessageModal";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IOrdinaryCyclesEntry } from "../IOrdinaryCyclesEntry";

interface IRegularPaymentCyclesFormUI {
  entries: IEntry[];
  formik: FormikProps<IOrdinaryCyclesEntry>;
  infoModal: IMessageModal;
  loading: boolean;
  numberDaysUntilCutOptions: IServerDomain[];
  paydayOptions: IServerDomain[];
  periodicityOptions: IServerDomain[];
  showAddModal: boolean;
  showInfoModal: boolean;
  valuesEqual: boolean;
  isMobile: boolean;
  columnWidths: number[];
  labelButtonPrevious: string;
  labelButtonNext: string;
  disabledButtonNext: boolean;
  onToggleInfoModal: () => void;
  onAddCycle: () => void;
  onToggleModal: () => void;
  onButtonClick: () => void;
  onChange: (name: string, value: string) => void;
  onPreviousStep: () => void;
  setEntryDeleted: (value: string | number) => void;
  isDisabledButton?: boolean;
}

export type { IRegularPaymentCyclesFormUI };
