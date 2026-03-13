interface ILineInformation {
  lineName: string;
  lineType: string;
  loading: boolean;
  title: string;
  description: string;
  optionCrumb: string;
  withBackModal: boolean;
  onOpenModal: () => void;
  onToggleInfoModal: () => void;
  withDecisions?: boolean;
  withoutDecisions?: boolean;
  addUseCase?: boolean;
}

export type { ILineInformation };
