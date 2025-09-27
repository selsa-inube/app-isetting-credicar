import { ILinesConstructionData } from "../ILinesConstructionData";

interface ICreditLinesConstruction {
  linesConstructionData: ILinesConstructionData;
  loadingInitial: boolean;
  setLinesConstructionData: React.Dispatch<
    React.SetStateAction<ILinesConstructionData>
  >;
  setLoadingInitial: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { ICreditLinesConstruction };
