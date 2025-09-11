interface IChangeToRequestTab {
  changeTab: boolean;
  maxWidthPage: string;
  setChangeTab: React.Dispatch<React.SetStateAction<boolean>>;
  setMaxWidthPage: React.Dispatch<React.SetStateAction<string>>;
}

export type { IChangeToRequestTab };
