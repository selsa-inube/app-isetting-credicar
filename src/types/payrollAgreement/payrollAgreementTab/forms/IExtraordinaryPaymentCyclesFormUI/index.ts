import { FormikProps } from "formik";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IExtraordinaryCyclesEntry } from "../IExtraordinaryCyclesEntry";

interface IExtraordinaryPaymentCyclesFormUI {
  formik: FormikProps<IExtraordinaryCyclesEntry>;
  entries: IEntry[];
  editDataOption: boolean;
  valuesEqual: boolean;
  loading: boolean;
  showModal: boolean;
  isMobile: boolean;
  typePaymentOptions: IServerDomain[];
  numberDaysUntilCutOptions: IServerDomain[];
  monthOptions: IServerDomain[];
  dayOptions: IServerDomain[];
  labelButtonNext: string;
  labelButtonPrevious: string;
  columnWidths: number[];
  pageLength: number;
  onAddCycle: () => void;
  onToggleModal: () => void;
  onButtonClick: () => void;
  onChange: (name: string, value: string) => void;
  onPreviousStep: () => void;
  setEntryDeleted: (value: string | number) => void;
  isDisabledButton?: boolean;
}

export type { IExtraordinaryPaymentCyclesFormUI };
