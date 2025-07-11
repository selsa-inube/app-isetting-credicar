import { IEntry } from "@design/data/optionsPropectCredit/types";

interface IOptionsPropectCredit {
  entry: IEntry;
  onChange: (id: string) => void;
}

export type { IOptionsPropectCredit };
