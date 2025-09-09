import { IOptionClient } from "../IOptionClient";

interface IClientsSupportLineForm {
  optionsIncluded: IOptionClient[];
  optionsExcluded: IOptionClient[];
  setOptionsIncluded: React.Dispatch<React.SetStateAction<IOptionClient[]>>;
  setOptionsExcluded: React.Dispatch<React.SetStateAction<IOptionClient[]>>;
}

export type { IClientsSupportLineForm };
