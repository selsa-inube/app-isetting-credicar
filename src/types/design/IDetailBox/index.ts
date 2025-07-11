import { IEntry } from "@ptypes/design/table/IEntry";
import { IAppearenceBoxContainer } from "@ptypes/IAppearenceBoxContainer";

interface IDetailBox {
  field: { id: string; titleName: string };
  data: IEntry;
  id: number;
  width: string;
  borderRadius?: string;
  padding?: string;
  borderColor?: IAppearenceBoxContainer;
  withTag?: boolean;
  ellipsis?: boolean;
}

export type { IDetailBox };
