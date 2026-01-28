interface IInfoConfigurationModal {
  description: string;
  title: string;
  onClick: () => void;
  onCloseModal: () => void;
  changeZIndex?: boolean;
}

export type { IInfoConfigurationModal };
