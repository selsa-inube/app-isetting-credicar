import { IOptionClient } from "../IOptionClient";

interface IClientsSupportLineFormUI {
  optionsExcluded: IOptionClient[];
  optionsIncluded: IOptionClient[];
  selectedConditionId: string | null;
  setSelectedConditionId: (id: string | null) => void;
  onClickIncluded: () => void;
  onClickExcluded: () => void;
}

export type { IClientsSupportLineFormUI };
