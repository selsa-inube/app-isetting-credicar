import { INavigationRule } from "@ptypes/creditLines/INavigationRule";
import { ILinesConstructionData } from "../ILinesConstructionData";

interface ICreditLinesConstruction {
  linesConstructionData: ILinesConstructionData;
  loadingInitial: boolean;
  optionsAllRules: INavigationRule[];
  useCaseConfiguration: string;
  linesEditData: ILinesConstructionData;
  setLinesConstructionData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  setLoadingInitial: React.Dispatch<React.SetStateAction<boolean>>;
  setOptionsAllRules: React.Dispatch<React.SetStateAction<INavigationRule[]>>;
  setUseCaseConfiguration: React.Dispatch<React.SetStateAction<string>>;
  setLinesEditData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
}

export type { ICreditLinesConstruction };
