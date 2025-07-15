import { Size, Status } from "@design/inputs/selectCheck/types";
import { IOptionItem } from "@design/inputs/selectCheck/optionItem";

interface ISelectCheckUI {
  id: string;
  name: string;
  optionListVisible: boolean;
  options: IOptionItem[];
  value: string | number;
  displayList: boolean;
  disabled?: boolean;
  focused?: boolean;
  fullwidth?: boolean;
  label?: string;
  message?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  size?: Size;
  invalid?: boolean;
  status?: Status;
  onBlur?: (event: FocusEvent) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onChangeCheck?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent) => void;
}

export type { ISelectCheckUI };
