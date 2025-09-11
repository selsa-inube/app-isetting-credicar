interface ILineInformation {
  lineName: string;
  lineType: string;
  updateData: boolean;
  loading: boolean;
  onOpenModal: () => void;
  onToggleInfoModal: () => void;
  withDecisions?: boolean;
  withoutDecisions?: boolean;
}

export type { ILineInformation };
