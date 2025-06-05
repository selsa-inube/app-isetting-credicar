const generalPoliciesTabsConfig = (smallScreen: boolean) => {
  return {
    generalPolicies: {
      id: "generalPolicies",
      isDisabled: false,
      label: smallScreen ? "Edición" : "Edición de políticas generales",
    },
    requestsInProgress: {
      id: "requestsInProgress",
      isDisabled: false,
      label: smallScreen
        ? "Politicas en trámite"
        : "Politicas generales en trámite",
    },
  };
};

export { generalPoliciesTabsConfig };
