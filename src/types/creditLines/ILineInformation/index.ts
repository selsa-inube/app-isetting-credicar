interface ILineInformation {
  lineName: string;
  lineType: string;
  updateData: boolean;
  loading: boolean;
  title: string;
  description: string;
  optionCrumb: string;
  withBackModal: boolean;
  withIcon: boolean;
  onOpenModal: () => void;
  onToggleInfoModal: () => void;
  withDecisions?: boolean;
  withoutDecisions?: boolean;
}

export type { ILineInformation };
