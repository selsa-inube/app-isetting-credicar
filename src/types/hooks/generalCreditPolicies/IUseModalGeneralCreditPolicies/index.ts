interface IUseModalGeneralCreditPolicies {
  emptyData: boolean;
  withoutPrivilegesAdd: boolean;
  showAddPolicies: boolean;
  defaultSelectedTab: string | undefined;
  showGoBackModal: boolean;
  smallScreen: boolean;
  handleScreenModal: () => void;
  handleEmptyData: () => void;
  handleCloseModal: () => void;
  handlePolicies: () => void;
  handleCloseGoBackModal: () => void;
  handleGoBack: () => void;
}

export type { IUseModalGeneralCreditPolicies };
