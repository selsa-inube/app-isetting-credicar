import { INavigationRule } from "@ptypes/creditLines/INavigationRule";
import { ILinesConstructionData } from "../ILinesConstructionData";

interface ICreditLinesConstruction {
  linesConstructionData: ILinesConstructionData;
  loadingInitial: boolean;
  optionsAllRules: INavigationRule[];
  setLinesConstructionData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  setLoadingInitial: React.Dispatch<React.SetStateAction<boolean>>;
  setOptionsAllRules: React.Dispatch<React.SetStateAction<INavigationRule[]>>;
}

export type { ICreditLinesConstruction };
