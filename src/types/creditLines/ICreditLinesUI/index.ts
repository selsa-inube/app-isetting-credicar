import { ICardData } from "@ptypes/home/ICardData";

interface ICreditLinesUI {
  loading: boolean;
  searchCreditLines: string;
  descriptionOptions: ICardData;
  onSearchCreditLines: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { ICreditLinesUI };
