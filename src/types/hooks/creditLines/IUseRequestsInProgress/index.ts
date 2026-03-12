interface IUseRequestsInProgress {
  businessUnits: string;
  businessManager: string;
  token: string;
  onRequestsEmpty?: () => void;
}

export type { IUseRequestsInProgress };
