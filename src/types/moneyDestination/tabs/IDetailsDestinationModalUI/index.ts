import { IEntry } from "@ptypes/design/table/IEntry";

interface IDetailsDestinationModalUI {
  data: IEntry;
  portalId: string;
  onCloseModal: () => void;
}

export type { IDetailsDestinationModalUI };
