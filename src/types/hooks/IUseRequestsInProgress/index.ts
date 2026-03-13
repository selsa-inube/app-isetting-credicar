interface IUseRequestsInProgress {
  businessManager: string;
  businessUnits: string;
  token: string;
  onRequestsEmpty?: () => void;
}

export type { IUseRequestsInProgress };
