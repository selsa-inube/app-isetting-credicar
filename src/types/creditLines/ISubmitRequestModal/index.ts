interface ISubmitRequestModal {
  description: string;
  title: string;
  unconfiguredRules: string[];
  loading: boolean;
  onClick: () => void;
  onCloseModal: () => void;
}

export type { ISubmitRequestModal };
