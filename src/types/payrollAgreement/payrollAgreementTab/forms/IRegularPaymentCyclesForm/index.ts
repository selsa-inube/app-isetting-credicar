import { IOrdinaryCyclesEntry } from "../IOrdinaryCyclesEntry";

interface IRegularPaymentCyclesForm {
  regularPaymentCycles: IOrdinaryCyclesEntry[];
  onButtonClick: () => void;
  onPreviousStep: () => void;
  setRegularPaymentCycles: React.Dispatch<
    React.SetStateAction<IOrdinaryCyclesEntry[]>
  >;
  setIncludeExtraPayDay: React.Dispatch<
    React.SetStateAction<IOrdinaryCyclesEntry[]>
  >;
  setRegularDeleted: React.Dispatch<
    React.SetStateAction<IOrdinaryCyclesEntry[]>
  >;
  loading?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IOrdinaryCyclesEntry) => void;
  editDataOption?: boolean;
  initialData?: IOrdinaryCyclesEntry[];
}

export type { IRegularPaymentCyclesForm };
