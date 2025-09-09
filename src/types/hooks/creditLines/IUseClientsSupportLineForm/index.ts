import { IOptionClient } from "@ptypes/creditLines/forms/IOptionClient";

interface IUseClientsSupportLineForm {
  optionsIncluded: IOptionClient[];
  optionsExcluded: IOptionClient[];
  setOptionsIncluded: React.Dispatch<React.SetStateAction<IOptionClient[]>>;
  setOptionsExcluded: React.Dispatch<React.SetStateAction<IOptionClient[]>>;
}

export type { IUseClientsSupportLineForm };
