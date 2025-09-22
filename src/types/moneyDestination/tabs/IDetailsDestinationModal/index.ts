import { IEntry } from "@ptypes/design/table/IEntry";
interface IDetailsDestinationModal {
  data: IEntry;
  portalId: string;
  onCloseModal: () => void;
}

export type { IDetailsDestinationModal };
