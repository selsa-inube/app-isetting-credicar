import { ICardData } from "@ptypes/home/ICardData";

interface ICreditLinesUI {
  loading: boolean;
  searchCreditLines: string;
  descriptionOptions: ICardData;
  columnWidths: number[];
  smallScreen: boolean;
  onSearchCreditLines: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { ICreditLinesUI };
