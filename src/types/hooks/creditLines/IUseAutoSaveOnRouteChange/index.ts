/* eslint-disable @typescript-eslint/no-explicit-any */
interface IUseAutoSaveOnRouteChange {
  option: string;
  withNeWData: boolean;
  linesData: any;
  userAccount: string;
  debounceMs?: number;
  setIsUpdated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IUseAutoSaveOnRouteChange };
