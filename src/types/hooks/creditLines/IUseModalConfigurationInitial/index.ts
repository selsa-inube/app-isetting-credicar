import { IErrors } from "@ptypes/IErrors";

interface IUseModalConfigurationInitial {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  errorData: IErrors;
  errorDataGroupRules: IErrors;
  hasError: boolean;
  hasErrorAllRules: boolean;
  loading: boolean;
  loadingAllRules: boolean;
  loadingGroupRules: boolean;
  showErrorModal: boolean;
  showErrorRulesModal: boolean;
  showWithoutDataModal: boolean;
  withoutData: boolean;
  hasErrorGroupRules: boolean;
  handleToggleErrorModal: () => void;
  handleToggleErrorRulesModal: () => void;
  handleToggleWithouDataModal: () => void;
}

export type { IUseModalConfigurationInitial };
