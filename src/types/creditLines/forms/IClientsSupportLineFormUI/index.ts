import { IOptionClient } from "../IOptionClient";

interface IClientsSupportLineFormUI {
  optionsExcluded: IOptionClient[];
  optionsIncluded: IOptionClient[];
  selectedConditionId: string | null;
  showInfoModal: boolean;
  updateData: boolean;
  loading: boolean;
  onOpenModal: () => void;
  onToggleInfoModal: () => void;
  setSelectedConditionId: (id: string | null) => void;
  onClickIncluded: () => void;
  onClickExcluded: () => void;
}

export type { IClientsSupportLineFormUI };
