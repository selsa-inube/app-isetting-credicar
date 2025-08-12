interface IModalData {
  title: string;
  description: string;
  actionText: string;
  withCancelButton: boolean;
  onCloseModal: () => void;
  onClick: () => void;
  subtitle?: string;
}

export type { IModalData };
