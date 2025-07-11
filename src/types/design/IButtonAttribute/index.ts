interface IButtonAttribute {
  onClick?: () => void;
  icon?: React.JSX.Element;
  value?: string | number;
}

export type { IButtonAttribute };
