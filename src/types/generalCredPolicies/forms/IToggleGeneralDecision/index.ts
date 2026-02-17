interface IToggleGeneralDecision {
  name: string;
  label: string;
  isChecked: boolean;
  definePerLine: boolean;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showIcon?: boolean;
  onInfoModal?: () => void;
}

export type { IToggleGeneralDecision };
