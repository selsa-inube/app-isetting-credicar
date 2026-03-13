import { INavigationRule } from "@ptypes/creditLines/INavigationRule";
import { ILinesConstructionData } from "../ILinesConstructionData";

interface ICreditLinesConstruction {
  linesConstructionData: ILinesConstructionData;
  loadingInitial: boolean;
  optionsAllRules: INavigationRule[];
  useCaseConfiguration: string;
  linesEditData: ILinesConstructionData;
  allValidRules: string[];
  filterRules: string[];
  optionRequest: string | undefined;
  setFilterRules: React.Dispatch<React.SetStateAction<string[]>>;
  setAllValidRules: React.Dispatch<React.SetStateAction<string[]>>;
  setLinesConstructionData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  setLoadingInitial: React.Dispatch<React.SetStateAction<boolean>>;
  setOptionsAllRules: React.Dispatch<React.SetStateAction<INavigationRule[]>>;
  setUseCaseConfiguration: React.Dispatch<React.SetStateAction<string>>;
  setOptionRequest: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLinesEditData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
}

export type { ICreditLinesConstruction };
