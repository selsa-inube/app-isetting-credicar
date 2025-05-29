import { IExtraordinaryCyclesEntry } from "../IExtraordinaryCyclesEntry";
import { IOrdinaryCyclesEntry } from "../IOrdinaryCyclesEntry";

interface IExtraordinaryPaymentCyclesForm {
  extraordinaryPayment: IExtraordinaryCyclesEntry[];
  typeRegularPayroll: boolean;
  regularPaymentCycles: IOrdinaryCyclesEntry[];
  regularDeleted: IOrdinaryCyclesEntry[];
  setExtraordinaryPayment: React.Dispatch<
    React.SetStateAction<IExtraordinaryCyclesEntry[]>
  >;
  onButtonClick: () => void;
  onPreviousStep: () => void;
  loading?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IExtraordinaryCyclesEntry) => void;
  editDataOption?: boolean;
  initialData?: IExtraordinaryCyclesEntry[];
}

export type { IExtraordinaryPaymentCyclesForm };
