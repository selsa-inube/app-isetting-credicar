import { IErrors } from "@ptypes/IErrors";
import { IEntry } from "@ptypes/design/table/IEntry";

interface IUseEmptyDataMessage {
  loading: boolean;
  data: Omit<IEntry[], "id">;
  errorData: IErrors;
  smallScreen: boolean;
  message: Record<string, string>;
}

export type { IUseEmptyDataMessage };
