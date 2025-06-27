interface IToggleGeneralDecision {
  name: string;
  label: string;
  isChecked: boolean;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showIcon?: boolean;
  onInfoModal?: () => void;
}

export type { IToggleGeneralDecision };
