/* eslint-disable @typescript-eslint/no-explicit-any */
interface IUseAutoSaveOnRouteChange {
  option: string;
  withNeWData: boolean;
  linesData: any;
  userAccount: string;
  debounceMs?: number;
  token: string;
  optionRequest: boolean;
  setIsUpdated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IUseAutoSaveOnRouteChange };
