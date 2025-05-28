interface IUseOutsideClick {
  primaryRef: React.RefObject<HTMLDivElement>;
  isSecondModalOpen: boolean;
  isThirdModalOpen: boolean;
  callback: () => void;
}
export type { IUseOutsideClick };
