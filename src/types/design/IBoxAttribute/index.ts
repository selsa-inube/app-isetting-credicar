import { IAttribute } from "../IAttribute";

interface IBoxAttribute {
  label: string;
  value?: number | string | IAttribute[];
  withButton?: boolean;
  buttonIcon?: React.JSX.Element;
  buttonValue?: string | number;
  direction?: "row" | "column";
  onClickButton?: () => void;
  withTag?: boolean;
  children?: React.ReactNode;
}

export type { IBoxAttribute };
