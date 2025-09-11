import { IOptionClient } from "../IOptionClient";

interface IClientContentBox {
  options: IOptionClient[];
  title: string;
  emptyMessage: string;
  selectedConditionId: string | null;
  setSelectedConditionId: (id: string | null) => void;
}

export type { IClientContentBox };
