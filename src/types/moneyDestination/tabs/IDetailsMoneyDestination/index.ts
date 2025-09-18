import { IEntry } from "@ptypes/design/table/IEntry";
interface IDetailsMoneyDestination {
  data: IEntry;
  showModal: boolean;
  handleToggleModal: () => void;
}

export type { IDetailsMoneyDestination };
