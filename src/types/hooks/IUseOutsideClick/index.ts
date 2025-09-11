interface IUseOutsideClick {
  primaryRef: React.RefObject<HTMLDivElement | null>;
  isSecondModalOpen: boolean;
  isThirdModalOpen: boolean;
  callback: () => void;
}
export type { IUseOutsideClick };
